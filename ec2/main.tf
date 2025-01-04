provider "aws" {
  region = var.aws_region
  profile = var.aws_profile
}

terraform {
  backend "s3" {
    bucket         = "backup-config-terraform-tfstate-lucky"       
    key            = "terraform/state.tfstate"  
    region         = "us-west-2"                
    encrypt        = true                                
    profile        = "herovired"                  
  }
}

# Create a Security Group
resource "aws_security_group" "ec2_security_group" {
  name        = "${var.instance_name}-sg"
  description = "Allow SSH and HTTP access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.allowed_ip_ranges
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.allowed_ip_ranges
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create an IAM Role for EC2
resource "aws_iam_role" "ec2_role" {
  name               = "${var.instance_name}-role"
  assume_role_policy = data.aws_iam_policy_document.ec2_assume_role_policy.json
}

# Attach a policy to the IAM role
resource "aws_iam_role_policy_attachment" "ec2_role_policy" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess" # Modify as needed
}

# Define IAM assume role policy
data "aws_iam_policy_document" "ec2_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

# Create an EC2 instance
resource "aws_instance" "example" {
  ami                       = var.ami_id
  instance_type             = var.instance_type
  key_name                  = var.key_name
  iam_instance_profile      = aws_iam_instance_profile.ec2_instance_profile.name
  security_groups           = [aws_security_group.ec2_security_group.name]
  associate_public_ip_address = true
  disable_api_termination     = var.termination_protection
  monitoring                  = var.enable_detailed_monitoring
  disable_api_stop            = var.stop_protection

  tags = {
    Name = var.instance_name
  }

  # Attach an EBS volume
  root_block_device {
    volume_type           = var.volume_type
    volume_size           = var.root_volume_size
    delete_on_termination = true
  }

  # Add a User Data script
#   user_data = <<-EOF
#               #!/bin/bash
#               sudo yum update -y
#               sudo yum install -y httpd
#               echo "Welcome to ${var.instance_name}" > /var/www/html/index.html
#               sudo systemctl start httpd
#               sudo systemctl enable httpd
#             EOF

  # Connection provisioner to install additional packages
  provisioner "remote-exec" {
    inline = [
      "sudo yum install -y git",
      "sudo yum install -y docker",
      "sudo systemctl start docker",
      "sudo systemctl enable docker"
    ]

    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = file(var.private_key_path)
      host        = self.public_ip
    }
  }
}

# Create an Instance Profile for the IAM Role
resource "aws_iam_instance_profile" "ec2_instance_profile" {
  name = "${var.instance_name}-instance-profile"
  role = aws_iam_role.ec2_role.name
}

# Create an Elastic IP
resource "aws_eip" "example" {
  vpc = true

  tags = {
    Name = "${var.instance_name}-eip"
  }
}

# Associate the Elastic IP with the EC2 instance
resource "aws_eip_association" "example" {
  instance_id   = aws_instance.example.id
  allocation_id = aws_eip.example.id
}


# Outputs
output "instance_id" {
  value = aws_instance.example.id
}

output "instance_public_ip" {
  value = aws_instance.example.public_ip
}

output "security_group_id" {
  value = aws_security_group.ec2_security_group.id
}
