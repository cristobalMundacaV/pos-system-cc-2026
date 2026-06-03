output "public_ip" {
  description = "IP pública de la VM"
  value       = azurerm_public_ip.main.ip_address
}

output "ssh_command" {
  description = "Comando para conectarse por SSH"
  value       = "ssh -i C:/Users/EliteBook/.ssh/pos-system-azure ${var.admin_username}@${azurerm_public_ip.main.ip_address}"
}

output "frontend_url" {
  description = "URL temporal del frontend"
  value       = "http://${azurerm_public_ip.main.ip_address}:3000"
}

output "backend_health_url" {
  description = "Health check del backend"
  value       = "http://${azurerm_public_ip.main.ip_address}:3001/health"
}

output "load_balancer_public_ip" {
  description = "IP pública del Load Balancer"
  value       = azurerm_public_ip.lb.ip_address
}

output "load_balancer_frontend_url" {
  description = "URL del frontend mediante Load Balancer"
  value       = "http://${azurerm_public_ip.lb.ip_address}:3000"
}

output "load_balancer_backend_health_url" {
  description = "Health check del backend mediante Load Balancer"
  value       = "http://${azurerm_public_ip.lb.ip_address}:3001/health"
}

