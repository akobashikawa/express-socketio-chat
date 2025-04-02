import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Añade esta importación


import { RouterOutlet } from '@angular/router';

declare const io: any;

interface Message {
  text: string;
  color?: string;
  isSender?: boolean;
}


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  socket = io(); // Inicializa socket.io en el componente
  message: string = '';
  receivedMessages: Message[] = [];
  clientId: string = '';

  ngOnInit() {
    // Conectar al servidor de socket.io
    this.socket.connect();

    // Obtener el ID del cliente al conectarse
    this.socket.on('connect', () => {
      this.clientId = this.socket.id; // Guardar el ID del cliente
    });

    // Escuchar el evento 'messageReceived' desde el servidor
    this.socket.on('messageReceived', ({ message, senderId }: { message: string; senderId: string }) => {
      console.log('Mensaje recibido:', message, 'de:', senderId); // Mostrar el mensaje en la consola
      const isSender = senderId === this.clientId; // Comparar el ID del emisor con el ID del cliente
      this.addReceivedMessage(message, isSender, senderId); // Agregar el mensaje a la lista
    });
  }

  sendMessage() {
    if (this.message.trim() !== '') { // Evitar enviar mensajes vacíos
      // Enviar el mensaje al servidor
      this.socket.emit('messageSent', this.message);
      this.message = ''; // Limpiar el campo de texto después de enviar
    }
  }

  addReceivedMessage(message: string, isSender: boolean, senderId: string) {
    // Generar un color único basado en el senderId
    const color = isSender ? 'black' : this.generateColorFromId(senderId);
    // Agregar el mensaje a la lista con información sobre si es propio y su color
    this.receivedMessages.push({
      text: isSender ? message : `${message} (from ${senderId})`,
      isSender,
      color
    });
  }
  generateColorFromId(id: string): string {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash); // Generar un hash numérico
    }
    const color = `#${((hash >> 24) & 0xff).toString(16).padStart(2, '0')}${((hash >> 16) & 0xff).toString(16).padStart(2, '0')}${((hash >> 8) & 0xff).toString(16).padStart(2, '0')}`;
    return color.slice(0, 7); // Asegurarse de que sea un color válido en formato #rrggbb
  }

}
