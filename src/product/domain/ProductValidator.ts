export class ProductValidator {
  static validate(data: {
    name: string;
    unit_measurement: string;
    current_quantity: number;
    minimum_quantity: number;
  }) {
    const name = data.name.trim().toLowerCase();

    const validUnits = ['kg', 'g', 'un', 'l', 'ml'];

    if (!validUnits.includes(data.unit_measurement))
      throw new Error('Unidade de medida inválida');

    if (data.current_quantity < data.minimum_quantity)
      throw new Error('Quantidade atual não pode ser menor que a mínima');

    return {
      ...data,
      name,
    };
  }
}
