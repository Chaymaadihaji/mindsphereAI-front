// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nouvelle palette de couleurs inspirée des designs modernes
        'primary-blue': '#4A90E2', // Un bleu primaire plus doux et moderne
        'primary-dark': '#2C3E50', // Couleur principale pour la navbar et le texte sombre
        'secondary-green': '#28B463', // Vert pour les accents positifs
        'light-gray': '#ECF0F1', // Gris très clair pour les fonds et bordures légères
        'medium-gray': '#BDC3C7', // Gris moyen pour les textes secondaires
        'dark-gray': '#34495E', // Gris foncé pour les textes ou éléments importants
        'white': '#FFFFFF', // Blanc pur
        'error-red': '#E74C3C', // Rouge pour les erreurs
        'accent-yellow': '#F39C12', // Jaune pour les mises en avant

        // Couleurs des émotions, légèrement ajustées pour la cohérence
        emotion_joy: '#FFD700', // Or
        emotion_sadness: '#6495ED', // Bleu maïs
        emotion_anger: '#DC143C', // Cramoisi
        emotion_fear: '#8B008B', // Violet foncé
        emotion_neutral: '#A9A9A9', // Gris foncé
        emotion_surprise: '#FFA500', // Orange
        emotion_disgust: '#228B22', // Vert forêt
        emotion_anticipation: '#FF4500', // Orange rouge
        emotion_love: '#FF69B4', // Rose vif
        emotion_optimism: '#3CB371', // Vert moyen
        emotion_stress: '#FF6347', // Tomate
        emotion_relief: '#9ACD32', // Vert Jaune

        // Assurez-vous que cette ligne est correcte
        border_light: '#D1D5DB', // Couleur de bordure claire, si vous voulez l'utiliser directement comme `border-border_light`
      },
      fontFamily: {
        sans: ['"Inter var", sans-serif'],
      },
      boxShadow: {
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}