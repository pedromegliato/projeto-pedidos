import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { pt } from 'vuetify/locale';


export default createVuetify({
  locale: {
    locale: 'pt',
    messages: { pt },
    fallback: 'pt'
  },
  theme: {
    defaultTheme: 'orangeTheme',
    themes: {
      orangeTheme: {
        dark: false,
        colors: {
          primary: '#FF9800',  
          secondary: '#F57C00', 
          accent: '#FFB74D',   
          error: '#E64A19',    
          info: '#2196F3',     
          success: '#4CAF50',  
          warning: '#FFC107',
        },
      },
    },
  },
})
