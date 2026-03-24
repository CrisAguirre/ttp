import { Component, OnInit } from '@angular/core';

interface ChatMessage {
  sender: 'cuy' | 'user';
  text: string;
}

interface ChatOption {
  text: string;
  action: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menuOpen = false;
  expanded: boolean[] = [false, false, false, false];
  isLoaded = false;
  
  // Cuy-TTP State
  chatOpen = false;
  chatMessages: ChatMessage[] = [];
  chatOptions: ChatOption[] = [];

  ngOnInit(): void {
    // Hide loader after 2.2s (2s animation + 0.2s buffer for fade)
    setTimeout(() => {
      this.isLoaded = true;
    }, 1500);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleService(index: number) {
    this.expanded[index] = !this.expanded[index];
  }

  // --- CUY-TTP LOGIC ---
  toggleChat() {
    this.chatOpen = !this.chatOpen;
    if (this.chatOpen && this.chatMessages.length === 0) {
      this.initChat();
    }
  }

  closeChat() {
    this.chatOpen = false;
  }

  initChat() {
    this.chatMessages = [
      { sender: 'cuy', text: '¡Hola! Soy Operador TTP 🐹, tu asistente virtual experto en trámites de tránsito.' },
      { sender: 'cuy', text: '¿En qué te puedo ayudar hoy?' }
    ];
    this.showMainMenu();
  }

  showMainMenu() {
    this.chatOptions = [
      { text: '🚗 Registro Automotor (Traspasos, Matrículas...)', action: 'registro' },
      { text: '🔧 Regrabaciones y Peritajes', action: 'regrabaciones' },
      { text: '📋 Licencias de Conducción', action: 'licencias' },
      { text: '⚠️ Infracciones, Patios y Comparendos', action: 'infracciones' },
      { text: '💬 Hablar con un Humano', action: 'asesor' }
    ];
    this.scrollToBottom();
  }

  handleOption(opt: ChatOption) {
    this.chatMessages.push({ sender: 'user', text: opt.text });
    this.chatOptions = [];
    this.scrollToBottom();
    
    setTimeout(() => {
      this.processAction(opt.action);
    }, 600);
  }

  processAction(action: string) {
    // Mensajes ultra precisos basados en la rama final que navegó el cliente
    const WAMessages: { [key: string]: string } = {
      asesor: 'Hola TTP, quisiera información general sobre trámites de tránsito.',
      
      // Registro Automotor
      asesor_traspaso_carro: 'Hola Operador TTP, necesito cotizar un Traspaso de Propiedad para un CARRO (incluye FUNT, SOAT, Tecno e Improntas).',
      asesor_traspaso_moto: 'Hola Operador TTP, necesito cotizar un Traspaso de Propiedad para una MOTO (incluye FUNT, SOAT, Tecno e Improntas).',
      asesor_prenda_levante: 'Hola Operador TTP, necesito ayuda con el LEVANTAMIENTO de Prenda de mi vehículo.',
      asesor_prenda_inscripcion: 'Hola Operador TTP, necesito ayuda con la INSCRIPCIÓN de Prenda de mi vehículo.',
      asesor_placas_cambio: 'Hola Operador TTP, solicito información para realizar el CAMBIO de formato de mis Placas.',
      asesor_placas_duplicado: 'Hola Operador TTP, perdí mis placas y necesito un DUPLICADO de Placas.',
      asesor_duplicado_tarjeta: 'Hola Operador TTP, perdí mi Tarjeta de Propiedad (Licencia de Tránsito) y necesito un duplicado.',
      
      // Regrabaciones
      asesor_perito_motor: 'Hola Operador TTP, necesito agendar un Perito Sijin para REGRABACIÓN DE MOTOR.',
      asesor_perito_chasis: 'Hola Operador TTP, necesito agendar un Perito Sijin para REGRABACIÓN DE CHASIS.',
      asesor_perito_serie: 'Hola Operador TTP, necesito agendar un Perito Sijin para REGRABACIÓN DE SERIE.',
      asesor_perito_chequeo: 'Hola Operador TTP, necesito agendar un CHEQUEO TÉCNICO EN SIJIN (Preventivo/Compraventa).',

      // Licencias
      asesor_lic_inicial_carro: 'Hola Operador TTP, quiero sacar mi Licencia de Conducción INICIAL para CARRO (B1/C1).',
      asesor_lic_inicial_moto: 'Hola Operador TTP, quiero sacar mi Licencia de Conducción INICIAL para MOTO (A2).',
      asesor_lic_inicial_ambas: 'Hola Operador TTP, quiero sacar mi Licencia de Conducción INICIAL para CARRO Y MOTO.',
      asesor_lic_renovacion_carro: 'Hola Operador TTP, requiero RENOVAR mi Licencia de Conducción de CARRO.',
      asesor_lic_renovacion_moto: 'Hola Operador TTP, requiero RENOVAR mi Licencia de Conducción de MOTO.',
      asesor_lic_renovacion_ambas: 'Hola Operador TTP, requiero RENOVAR mis Licencias de Conducción de CARRO Y MOTO.',

      // Infracciones
      asesor_patios_moto: '🚨 ¡Urgente! Hola Operador TTP, necesito ayuda para SALIDA DE PATIOS de una MOTO.',
      asesor_patios_carro: '🚨 ¡Urgente! Hola Operador TTP, necesito ayuda para SALIDA DE PATIOS de un CARRO.',
      asesor_comparendos: 'Hola Operador TTP, requiero información sobre el Curso de Comparendos para obtener descuento.',
      asesor_acuerdos: 'Hola Operador TTP, me interesa solicitar un Acuerdo de Pago para mis infracciones.'
    };

    switch (action) {
      // ==========================================
      // ROOT LEVEL 1
      // ==========================================
      case 'registro':
        this.chatMessages.push({ sender: 'cuy', text: 'Los trámites de Registro Automotor son súper solicitados. ¿De qué trámite hablamos?' });
        this.chatOptions = [
          { text: 'Traspaso de Propiedad', action: 'traspaso' },
          { text: 'Prenda (Levante/Inscripción)', action: 'prenda' },
          { text: 'Placas (Duplicado/Cambio)', action: 'placas' },
          { text: 'Duplicado Tarjeta de Propiedad', action: 'asesor_duplicado_tarjeta' },
          { text: '🔄 Reiniciar chat', action: 'main' }
        ];
        break;

      case 'regrabaciones':
        this.chatMessages.push({ sender: 'cuy', text: 'El servicio de peritaje Sijin requiere desplazar un perito. ¿Exactamente qué requieres revisar o regrabar?' });
        this.chatOptions = [
          { text: 'Regrabación de Motor', action: 'asesor_perito_motor' },
          { text: 'Regrabación de Chasis', action: 'asesor_perito_chasis' },
          { text: 'Regrabación de Serie', action: 'asesor_perito_serie' },
          { text: 'Solo Chequeo Técnico', action: 'asesor_perito_chequeo' },
          { text: '🔄 Reiniciar chat', action: 'main' }
        ];
        break;

      case 'licencias':
        this.chatMessages.push({ sender: 'cuy', text: '¡Excelente! Para apoyarte con la Licencia de Conducción, ¿qué tipo de trámite es?' });
        this.chatOptions = [
          { text: 'Es mi Primera Licencia (Inicial)', action: 'licencia_inicial' },
          { text: 'Es una Renovación', action: 'licencia_renovacion' },
          { text: '🔄 Reiniciar chat', action: 'main' }
        ];
        break;

      case 'infracciones':
        this.chatMessages.push({ sender: 'cuy', text: 'Entendido. Los problemas de tránsito hay que resolverlos rápido. ¿Qué necesitas?' });
        this.chatOptions = [
          { text: '🚨 Salida de Patios', action: 'patios' },
          { text: 'Curso de comparendos', action: 'asesor_comparendos' },
          { text: 'Acuerdos de Pago', action: 'asesor_acuerdos' },
          { text: '🔄 Reiniciar chat', action: 'main' }
        ];
        break;

      // ==========================================
      // LEVEL 2: REGISTRO AUTOMOTOR
      // ==========================================
      case 'traspaso':
        this.chatMessages.push({ sender: 'cuy', text: 'Para traspaso necesitamos tomar improntas, contrato y FUNT. ¿El traspaso es para un Carro o una Moto?' });
        this.chatOptions = [
          { text: 'Es para un Carro', action: 'asesor_traspaso_carro' },
          { text: 'Es para una Moto', action: 'asesor_traspaso_moto' },
          { text: '🔄 Reiniciar chat', action: 'main' }
        ];
        break;

      case 'prenda':
        this.chatMessages.push({ sender: 'cuy', text: 'Trámites de prenda. ¿Ya terminaste de pagar al banco (Levantamiento) o apenas te financiaron (Inscripción)?' });
        this.chatOptions = [
          { text: 'Levante de Prenda', action: 'asesor_prenda_levante' },
          { text: 'Inscripción de Prenda', action: 'asesor_prenda_inscripcion' },
          { text: '🔄 Reiniciar chat', action: 'main' }
        ];
        break;

      case 'placas':
        this.chatMessages.push({ sender: 'cuy', text: '¿Se te perdieron las placas (Duplicado) o quieres actualizar el formato amarillo reflectivo (Cambio)?' });
        this.chatOptions = [
          { text: 'Duplicado (Pérdida/Robo)', action: 'asesor_placas_duplicado' },
          { text: 'Cambio de Formato', action: 'asesor_placas_cambio' },
          { text: '🔄 Reiniciar chat', action: 'main' }
        ];
        break;

      // ==========================================
      // LEVEL 2: LICENCIAS
      // ==========================================
      case 'licencia_inicial':
        this.chatMessages.push({ sender: 'cuy', text: 'Perfecto, validaremos el CRC para tu Licencia Inicial. ¿Para qué vehículo la buscas?' });
        this.chatOptions = [
          { text: 'Solo Carro (B1/C1)', action: 'asesor_lic_inicial_carro' },
          { text: 'Solo Moto (A2)', action: 'asesor_lic_inicial_moto' },
          { text: 'Carro y Moto', action: 'asesor_lic_inicial_ambas' },
          { text: '🔄 Reiniciar chat', action: 'main' }
        ];
        break;

      case 'licencia_renovacion':
        this.chatMessages.push({ sender: 'cuy', text: 'Ok, para Renovación verificamos estado en RUNT médicos. ¿Qué categorías vas a renovar?' });
        this.chatOptions = [
          { text: 'Renovar Carro', action: 'asesor_lic_renovacion_carro' },
          { text: 'Renovar Moto', action: 'asesor_lic_renovacion_moto' },
          { text: 'Renovar Ambas', action: 'asesor_lic_renovacion_ambas' },
          { text: '🔄 Reiniciar chat', action: 'main' }
        ];
        break;

      // ==========================================
      // LEVEL 2: INFRACCIONES & PATIOS
      // ==========================================
      case 'patios':
        this.chatMessages.push({ sender: 'cuy', text: 'La salida de patios es URGENTE por costos de parqueadero. ¿Tenemos que sacar un carro o una moto?' });
        this.chatOptions = [
          { text: 'Sacar una Moto', action: 'asesor_patios_moto' },
          { text: 'Sacar un Carro', action: 'asesor_patios_carro' },
          { text: '🔄 Reiniciar chat', action: 'main' }
        ];
        break;

      // ==========================================
      // FLOW END: REDIRECT TO WA OR MAIN MENU
      // ==========================================
      case 'main':
        this.showMainMenu();
        return;

      default:
        // Manejo de variables asesor_* o open_wa_*
        if (action.startsWith('open_wa_')) {
          const url = 'https://wa.me/573137733408?text=' + action.split('open_wa_')[1];
          window.open(url, '_blank');
          this.closeChat();
        } else if (action.startsWith('asesor')) {
          let finalMsg = WAMessages[action] || WAMessages['asesor'];
          this.chatMessages.push({ sender: 'cuy', text: '¡Todo listo! 📝 Haz clic en el botón de abajo para enviar esta información exacta por WhatsApp a nuestro asesor.' });
          this.chatOptions = [
            { text: '👉 Ir a WhatsApp y enviar solicitud', action: 'open_wa_' + encodeURIComponent(finalMsg) },
            { text: '🔄 Reiniciar chat', action: 'main' }
          ];
        } else {
          this.showMainMenu();
        }
        return;
    }
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatBody = document.querySelector('.chat-body');
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }, 50);
  }
}
