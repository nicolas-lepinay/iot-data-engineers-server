import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';
import { EquipmentsService } from '../equipments/equipments.service';

@Controller()
export class MqttController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @EventPattern('+/+/VALUE') // Match "<houseEsp32Id>/<equipmentEsp32Id>/VALUE"
  async handleValueUpdate(@Payload() payload: string, @Ctx() context: MqttContext) {
    try {
      const topic = context.getTopic(); // Le sujet complet
      const [houseEsp32Id, equipmentEsp32Id] = topic.split('/');

      console.log('Topic HOUSE reçu :', houseEsp32Id);
      console.log('Topic EQUIPMENT reçu :', equipmentEsp32Id);
      console.log('Message VALUE reçu :', payload);

      // Mettre à jour la valeur de l'équipement
    //   const updatedEquipment = await this.equipmentsService.updateByHouseAndEquipment(
    //     houseEsp32Id,
    //     equipmentEsp32Id,
    //     { value: payload }, // Mise à jour de la valeur
    //   );

    //   if (!updatedEquipment) {
    //     console.error('Équipement non trouvé ou mise à jour échouée');
    //   } else {
    //     console.log('Équipement mis à jour :', updatedEquipment);
    //   }
    } catch (error) {
      console.error('Erreur lors du traitement du message :', error.message);
    }
  }

  @EventPattern('+/+/STATE') // Match "<houseEsp32Id>/<equipmentEsp32Id>/STATE"
  async handleStateUpdate(@Payload() payload: string, @Ctx() context: MqttContext) {
    try {
      const topic = context.getTopic(); // Le sujet complet
      const [houseEsp32Id, equipmentEsp32Id] = topic.split('/');

      console.log('Topic HOUSE reçu :', houseEsp32Id);
      console.log('Topic EQUIPMENT reçu :', equipmentEsp32Id);
      console.log('Message STATE reçu :', payload);

      // Convertir le payload en boolean pour le state
      const state = payload.toLowerCase() === 'on';

      // Mettre à jour l'état de l'équipement
    //   const updatedEquipment = await this.equipmentsService.updateByHouseAndEquipment(
    //     houseEsp32Id,
    //     equipmentEsp32Id,
    //     { state: state }, // Mise à jour de l'état
    //   );

    //   if (!updatedEquipment) {
    //     console.error('Équipement non trouvé ou mise à jour échouée');
    //   } else {
    //     console.log('Équipement mis à jour :', updatedEquipment);
    //   }
    } catch (error) {
      console.error('Erreur lors du traitement du message :', error.message);
    }
  }
}
