variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-west-2"
}

variable "aws_profile" {
  description = "AWS profile to deploy resources"
  type        = string
  default     = "herovired"
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance"
  type        = string
}

variable "instance_type" {
  description = "Type of the EC2 instance"
  type        = string
  default     = "t3.micro"
}

variable "instance_name" {
  description = "Name tag for the EC2 instance"
  type        = string
}

variable "key_name" {
  description = "Key pair name for SSH access"
  type        = string
}

variable "private_key_path" {
  description = "Path to the private key file for SSH"
  type        = string
}

variable "allowed_ip_ranges" {
  description = "List of CIDR blocks allowed for SSH and HTTP access"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "volume_type" {
  description = "Type of EBS volume"
  type        = string
  default     = "gp2"
}

variable "root_volume_size" {
  description = "Size of the root EBS volume in GB"
  type        = number
  default     = 20
}
variable "stop_protection" {
  description = "Enable or disable stop protection for the EC2 instance"
  type        = bool
  default     = false
}

variable "enable_detailed_monitoring" {
  description = "Enable or disable detailed monitoring for the EC2 instance"
  type        = bool
  default     = true
}
variable "termination_protection" {
  description = "Enable or disable termination protection for the EC2 instance"
  type        = bool
  default     = true
}
