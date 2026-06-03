variable "project_name" {
  description = "Nombre base del proyecto"
  type        = string
  default     = "pos-system"
}

variable "resource_group_name" {
  description = "Nombre del grupo de recursos"
  type        = string
  default     = "pos-system-rg"
}

variable "location" {
  description = "Región de Azure"
  type        = string
  default     = "eastus2"
}

variable "vm_size" {
  description = "Tamaño de la máquina virtual"
  type        = string
  default     = "Standard_D2s_v3"
}

variable "admin_username" {
  description = "Usuario administrador Linux"
  type        = string
  default     = "azureuser"
}

variable "ssh_public_key_path" {
  description = "Ruta de la llave pública SSH"
  type        = string
  default     = "C:/Users/EliteBook/.ssh/pos-system-azure.pub"
}

variable "ssh_source_address" {
  description = "IP permitida para SSH. Para demo puede ser *, pero idealmente debe ser tu IP pública."
  type        = string
  default     = "*"
}