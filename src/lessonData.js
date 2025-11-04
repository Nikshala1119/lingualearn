// Organized lesson data by language and difficulty
export const lessons = {
    spanish: {
      name: "Spanish",
      icon: "🇪🇸",
      levels: {
        beginner: {
          title: "Beginner  Basics",
          xp: 10,
          questions: [
            {
              id: 1,
              question: "What does 'Hola' mean?",
              options: ["Goodbye", "Hello", "Thank you", "Please"],
              correctAnswer: 1,
            },
            {
              id: 2,
              question: "What does 'Gracias' mean?",
              options: ["Hello", "Goodbye", "Thank you", "Please"],
              correctAnswer: 2,
            },
            {
              id: 3,
              question: "What does 'Adiós' mean?",
              options: ["Hello", "Goodbye", "Thank you", "Please"],
              correctAnswer: 1,
            },
            {
              id: 4,
              question: "What does 'Por favor' mean?",
              options: ["Hello", "Goodbye", "Thank you", "Please"],
              correctAnswer: 3,
            },
            {
              id: 5,
              question: "What does 'Sí' mean?",
              options: ["Yes", "No", "Maybe", "Hello"],
              correctAnswer: 0,
            }
          ]
        },
        intermediate: {
          title: "Common Phrases",
          xp: 15,
          questions: [
            {
              id: 6,
              question: "What does '¿Cómo estás?' mean?",
              options: ["Where are you?", "How are you?", "Who are you?", "What is this?"],
              correctAnswer: 1,
            },
            {
              id: 7,
              question: "What does 'Buenas noches' mean?",
              options: ["Good morning", "Good afternoon", "Good night", "Goodbye"],
              correctAnswer: 2,
            },
            {
              id: 8,
              question: "What does 'Lo siento' mean?",
              options: ["Thank you", "I'm sorry", "Excuse me", "Hello"],
              correctAnswer: 1,
            }
          ]
        }
      }
    },
    french: {
      name: "French",
      icon: "🇫🇷",
      levels: {
        beginner: {
          title: "Beginner Basics",
          xp: 10,
          questions: [
            {
              id: 9,
              question: "What does 'Bonjour' mean?",
              options: ["Good night", "Hello/Good day", "Goodbye", "Thank you"],
              correctAnswer: 1,
            },
            {
              id: 10,
              question: "What does 'Merci' mean?",
              options: ["Hello", "Goodbye", "Thank you", "Please"],
              correctAnswer: 2,
            },
            {
              id: 11,
              question: "What does 'Au revoir' mean?",
              options: ["Hello", "Goodbye", "Thank you", "Please"],
              correctAnswer: 1,
            },
            {
              id: 12,
              question: "What does 'S'il vous plaît' mean?",
              options: ["Hello", "Goodbye", "Thank you", "Please"],
              correctAnswer: 3,
            },
            {
              id: 13,
              question: "What does 'Oui' mean?",
              options: ["Yes", "No", "Maybe", "Hello"],
              correctAnswer: 0,
            }
          ]
        },
        intermediate: {
          title: "Common Phrases",
          xp: 15,
          questions: [
            {
              id: 14,
              question: "What does 'Comment allez-vous?' mean?",
              options: ["Where are you?", "How are you?", "Who are you?", "What is this?"],
              correctAnswer: 1,
            },
            {
              id: 15,
              question: "What does 'Bonne nuit' mean?",
              options: ["Good morning", "Good afternoon", "Good night", "Goodbye"],
              correctAnswer: 2,
            }
          ]
        }
      }
    },
    german: {
      name: "German",
      icon: "🇩🇪",
      levels: {
        beginner: {
          title: "Beginner Basics",
          xp: 10,
          questions: [
            {
              id: 16,
              question: "What does 'Hallo' mean?",
              options: ["Goodbye", "Hello", "Thank you", "Please"],
              correctAnswer: 1,
            },
            {
              id: 17,
              question: "What does 'Danke' mean?",
              options: ["Hello", "Goodbye", "Thank you", "Please"],
              correctAnswer: 2,
            },
            {
              id: 18,
              question: "What does 'Auf Wiedersehen' mean?",
              options: ["Hello", "Goodbye", "Thank you", "Please"],
              correctAnswer: 1,
            },
            {
              id: 19,
              question: "What does 'Bitte' mean?",
              options: ["Hello", "Goodbye", "Thank you", "Please/You're welcome"],
              correctAnswer: 3,
            },
            {
              id: 20,
              question: "What does 'Ja' mean?",
              options: ["Yes", "No", "Maybe", "Hello"],
              correctAnswer: 0,
            }
          ]
        }
      }
    }
  };
  
  // Helper function to get all lessons as an array
  export const getAllLessons = () => {
    const allLessons = [];
    
    Object.keys(lessons).forEach(language => {
      Object.keys(lessons[language].levels).forEach(level => {
        allLessons.push({
          id: `${language}-${level}`,
          language,
          level,
          ...lessons[language].levels[level],
          languageName: lessons[language].name,
          icon: lessons[language].icon
        });
      });
    });
    
    return allLessons;
  };