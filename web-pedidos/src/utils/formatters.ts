export const currencyFormatter = {
    format: (value: number) => {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).replace('R$', '').trim();
    },
    parse: (value: string) => {
      const parsed = parseFloat(
        value.replace('R$ ', '')
             .replace(/\./g, '')
             .replace(',', '.')
      );
      return isNaN(parsed) ? 0 : parsed;
    }
  };