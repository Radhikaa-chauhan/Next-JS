//1. After installing  zod we first have to import it 

import {z} from "zod";

// 2. Creating ZOD schema
const userSchema = z.object({
  name: z.string(),
  age: z.number().optional(),
  country:z.string().default("Unknown"),
  email:z.string().email(),
 
});


//3.Creating Actual Data

const userData = {
  name:"Radhika",
  age: 22,
  // country: "India",
  email:"radhika@gmail.com"
};

//4. Validate Data

 const validUser =  userSchema.parse(userData);
 console.log(validUser);


//if we use safe parse instead of parse then it will not throw error on parsing the wrong data
// so for throwing error i have to just use the format function

const result= userSchema.safeParse({
  name:"Huxn",
  age:"twenty",
  email:"test@gmail.com",
});

if(!result.success){
console.log(result.error.format());
}


// Arrays in zod

const hobbiesSchema = z.array(z.string());
const userHobbies = ["reading", "cooking", "coding"];
  console.log(hobbiesSchema.parse(userHobbies));


  // Validating our data by zod enums

  const roleSchema = z.enum(["admin","user","guest"]);
  const userRole ="admin";
  console.log(roleSchema.parse(userRole));


  const userSchema2 = z.object({
  name: z.string(),
  age: z.number().optional(),
  country:z.string().default("Unknown"),
  email:z.string().email(),
 
});
type User = z.infer<typeof userSchema2>;

const validUsers :User = { 
  name:"Radhika",
  age:19,
  country:"India",
  email:"radhika@gmail.com",
}

try{
const parsedUser = userSchema2.parse(validUsers);
console.log("Valid user" ,parsedUser);
}
catch(error){
  console.log("X Error: ",error );
}