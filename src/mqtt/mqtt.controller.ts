import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';
import { EquipmentsService } from '../equipments/equipments.service';
import { EventsService } from '../events/events.service';

interface EventPayload {
    equipmentEsp32Id: string;
    houseId: string;
    state: boolean;
    value?: string | null;
    unit?: string | null;
}

@Controller()
export class MqttController {
    constructor(    
        private readonly eventsService: EventsService,
        private readonly equipmentsService: EquipmentsService,
    ) {}

    @EventPattern('ADD/EVENT') // Souscription au topic
    async handleAddEvent(@Payload() payload: string, @Ctx() context: MqttContext) {
        try {
            console.log('Message reçu sur ADD/EVENT :', payload);

            // Parse et valide le payload
            const eventPayload: EventPayload = typeof payload === 'string' ? JSON.parse(payload) : payload;
            this.validatePayload(eventPayload);

            const newEvent = await this.createEvent(eventPayload);
            if (newEvent) await this.updateEquipment(eventPayload);
                     
          } catch (error) {
            console.error('HANDLE EVENT | Erreur lors du traitement du message MQTT :', error.message);
          }
        }

    private async createEvent(payload: EventPayload) {
        try {
            const { equipmentEsp32Id, houseId, state, value, unit } = payload;
      
            const newEvent = await this.eventsService.create({
              equipment: {
                connect: { 
                    esp32Id_houseId: { 
                        esp32Id: equipmentEsp32Id, houseId 
                    } 
                }, // Relation composite
              },
              house: {
                connect: { 
                    id: houseId 
                },
              },
              state,
              value,
              unit,
            });
            console.log('Nouvel événement créé :', newEvent);
            return newEvent;
        } catch(e) {
            console.error('CREATE EVENT | Erreur lors du traitement du payload MQTT :', e.message);
            return null;
        }
    }

    private async updateEquipment(payload: EventPayload) {
        try {
            const { equipmentEsp32Id, houseId, state, value, unit } = payload;
      
            const updatedEquipment = await this.equipmentsService.updateByHouseAndEquipment(houseId, equipmentEsp32Id, { state, value, unit } );
            if (updatedEquipment) {
                console.log('Équipement mis à jour :', updatedEquipment);
                return updatedEquipment;
            } else {
                console.error('Équipement non trouvé ou mise à jour échouée');
                return null;
            }
        } catch(e) {
            console.error('UPDATE EQUIPMENT | Erreur lors du traitement du payload MQTT :', e.message);
            return null;
        }
    }

    private validatePayload(payload: EventPayload) {
        const requiredFields = ['equipmentEsp32Id', 'houseId', 'state'];
        for (const field of requiredFields) {
          if (!payload[field]) {
            throw new Error(`Payload MQTT invalide : le champ '${field}' est manquant.`);
          }
        }
      }
}

