
const users = [{
  "username": "admin",
  "password": "admin",
  "email": "admin@gmail.com"
},
{
  "username": "user",
  "password": "user",
  "email": "user@gmail.com"
},
{
  "username": "tabish",
  "password": "12345678",
  "email": "tabish@gmail.com"
},
{
  "username": "saqlain",
  "password": "abcd1122",
  "email": "saqlain@gmail.com"
},
{
  "username": "noor",
  "password": "password123",
  "email": "noor@gmail.com"
},
{
  "username": "zain",
  "password": "zainpass",
  "email": "zain@gmail.com"
},
{
  "username": "ali",
  "password": "mypassword",
  "email": "ali@gmail.com"
},
{
  "username": "maya",
  "password": "qwerty",
  "email": "maya@gmail.com"
},
{
  "username": "aisha",
  "password": "1234abcd",
  "email": "aisha@gmail.com"
},
{
  "username": "hassan",
  "password": "hassanhere",
  "email": "hassan@gmail.com"
}];

const passwords = [];

const foods = [
  {
    "name": "Apple",
    "calories": 95,
    "proteins": 0.5,
    "carbs": 25,
    "fats": 0.3,
    "sugars": 19
  },
  {
    "name": "Banana",
    "calories": 105,
    "proteins": 1.3,
    "carbs": 27,
    "fats": 0.3,
    "sugars": 14
  },
  {
    "name": "Chicken Breast",
    "calories": 165,
    "proteins": 31,
    "carbs": 0,
    "fats": 3.6,
    "sugars": 0
  },
  {
    "name": "Broccoli",
    "calories": 55,
    "proteins": 3.7,
    "carbs": 11,
    "fats": 0.6,
    "sugars": 2
  },
  {
    "name": "Oatmeal",
    "calories": 154,
    "proteins": 6.1,
    "carbs": 27,
    "fats": 3.2,
    "sugars": 1
  },
  {
    "name": "Almonds",
    "calories": 576,
    "proteins": 21,
    "carbs": 21,
    "fats": 50,
    "sugars": 4
  },
  {
    "name": "Rice",
    "calories": 206,
    "proteins": 4.3,
    "carbs": 45,
    "fats": 0.4,
    "sugars": 0.1
  },
  {
    "name": "Salmon",
    "calories": 206,
    "proteins": 22,
    "carbs": 0,
    "fats": 12,
    "sugars": 0
  },
  {
    "name": "Egg",
    "calories": 155,
    "proteins": 13,
    "carbs": 1.1,
    "fats": 11,
    "sugars": 1.1
  },
  {
    "name": "Greek Yogurt",
    "calories": 100,
    "proteins": 10,
    "carbs": 4,
    "fats": 0.7,
    "sugars": 4
  }
];

const exercises = [
  {
    "name": "Running",
    "type": "Cardiovascular",
    "calories_per_unit": 10
  },
  {
    "name": "Cycling",
    "type": "Cardiovascular",
    "calories_per_unit": 8
  },
  {
    "name": "Jump Rope",
    "type": "Cardiovascular",
    "calories_per_unit": 12
  },
  {
    "name": "Swimming",
    "type": "Cardiovascular",
    "calories_per_unit": 9
  },
  {
    "name": "Rowing",
    "type": "Cardiovascular",
    "calories_per_unit": 7
  },
  {
    "name": "Stair Climbing",
    "type": "Cardiovascular",
    "calories_per_unit": 11
  },
  {
    "name": "Elliptical Machine",
    "type": "Cardiovascular",
    "calories_per_unit": 7
  },
  {
    "name": "Dancing",
    "type": "Cardiovascular",
    "calories_per_unit": 6
  },
  {
    "name": "Hiking",
    "type": "Cardiovascular",
    "calories_per_unit": 8
  },
  {
    "name": "Jumping Jacks",
    "type": "Cardiovascular",
    "calories_per_unit": 9
  },
  {
    "name": "Bench Press",
    "type": "Strength",
    "calories_per_unit": 0.5
  },
  {
    "name": "Squats",
    "type": "Strength",
    "calories_per_unit": 0.32
  },
  {
    "name": "Deadlift",
    "type": "Strength",
    "calories_per_unit": 0.55
  },
  {
    "name": "Pull Ups",
    "type": "Strength",
    "calories_per_unit": 0.8
  },
  {
    "name": "Push Ups",
    "type": "Strength",
    "calories_per_unit": 0.29
  },
  {
    "name": "Lunges",
    "type": "Strength",
    "calories_per_unit": 0.25
  },
  {
    "name": "Bicep Curls",
    "type": "Strength",
    "calories_per_unit": 0.18
  },
  {
    "name": "Tricep Dips",
    "type": "Strength",
    "calories_per_unit": 0.21
  },
  {
    "name": "Shoulder Press",
    "type": "Strength",
    "calories_per_unit": 0.23
  },
  {
    "name": "Leg Press",
    "type": "Strength",
    "calories_per_unit": 0.45
  }
]

module.exports = {
  users,
  passwords,
  foods,
  exercises
};