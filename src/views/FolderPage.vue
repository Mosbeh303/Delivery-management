<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
     
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content >
  
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"></ion-title>


        </ion-toolbar>
      </ion-header>
      <div class="ion-text-center">
        <ion-list>
       
          
          
        
          <ion-item  v-if="this.pageTitle==='plans' ">
   <ion-button  color="success" @click="addPlan()"><ion-icon :icon="addOutline"></ion-icon
   ></ion-button>
  
  </ion-item>
    
 
   
  
  <ion-item  v-if="this.pageTitle==='employes' && showPlansList===false">
    <ion-button  color="success" @click="addEmploye()"><ion-icon :icon="addOutline"></ion-icon
    ></ion-button>
   
   </ion-item>
  
  <ion-item v-if="showPlansList===true">
    <ion-buttons >
      <ion-back-button @click="backToEmployes()" color="primary" default-href="/folder/employes" ></ion-back-button>
      
      </ion-buttons> 
  </ion-item>
    
  
   
  
  
  
  
  
  
  <div v-if="pageTitle==='rounds'">
  
    <ion-grid v-for="round in rounds" :key="round.id" >
  
  
  
      <ion-row >
      <ion-col>{{round.destination}}   </ion-col> 
      
      <ion-col>{{round.zip_code}} </ion-col>
        
      <ion-col>
      <ion-button  class="customButton" color="secondary"  @click="updateRound(round.id,round.destination,round.zip_code)">      <ion-label ><ion-icon :icon="create"></ion-icon
      ></ion-label>
      </ion-button>
      </ion-col>
      <ion-col >
      <ion-button  class="customButton" color="danger" @click="deleteRound(round.id)">
      <ion-label ><ion-icon :icon="trash"></ion-icon
      ></ion-label>
      </ion-button>
      
      </ion-col>
      
      
      
      </ion-row>
      </ion-grid>
      
      
  </div>
  
  
  </ion-list>
  <div v-if="showPlansList">
          
             
    
      <ion-grid>
        <ion-row>
          <ion-col>
          <strong>Day</strong>
          </ion-col>
        </ion-row>
        <ion-row v-for="day in planDays" :key="day.id">
          <ion-col >
           
              <ion-radio-group  v-model="selectedDay" >
     
               <ion-item>
                <ion-label>{{day.label}} - {{day.date}}   </ion-label>
                <ion-radio :value="day.id" slot="start"></ion-radio>
              </ion-item>


              </ion-radio-group>
            
           
          </ion-col>
       
        </ion-row>
      </ion-grid>
      
       
    
  
      
  
  <div style="text-align: center">
    <ion-button @click="addRound()" v-if="this.selectedDay!==0">
      Destination
    </ion-button>
    
                
    
  </div>
  
  
  
  
  
  
  </div>
        <div >
          <div v-if="pageTitle==='employes' && showPlansList===false">
          
           
            <ion-grid >
          
              <ion-row >
              <ion-col><strong>Name</strong>  </ion-col>
              <ion-col><strong>Phone</strong>  </ion-col>
              <ion-col><strong>Status</strong>  </ion-col>
              <ion-col></ion-col>
              <ion-col></ion-col>
          
              <ion-col></ion-col>
  
            </ion-row>
            </ion-grid>
            <ion-grid v-for="employe in employes" :key="employe.id" >
          
          
          
              <ion-row >
              <ion-col>{{employe.name}}   </ion-col> 
              
              <ion-col>{{employe.tel}} </ion-col>
              <ion-col v-if="employe.available !== 0">Available </ion-col>
              <ion-col v-if="employe.available === 0">Busy </ion-col>
  
              <ion-col>
              <ion-button  class="customButton" color="secondary" 
               @click="updateEmploye(employe.id,employe.name,employe.tel)">   
                  <ion-icon :icon="create"></ion-icon
              >
              </ion-button>
              </ion-col>
              <ion-col >
            
              <ion-button @click="enablePlans(employe.id)" class="customButton" color="success" >
                <ion-icon :icon="bicycleOutline"></ion-icon></ion-button>
             
               
                 
                </ion-col>
              <ion-col >
                <ion-button  class="customButton" color="danger"
                @click="deleteEmploye(employe.id)">
               <ion-icon :icon="trash"></ion-icon
               >
               </ion-button>
              
              </ion-col>
              
                
              
              
              </ion-row>
              </ion-grid>
              
              
          </div>
          
   <ion-grid  v-if="pageTitle==='rounds'">
  
    <ion-row >
  <ion-col><strong>Destination</strong> </ion-col>
  
  <ion-col><strong>Zip code</strong></ion-col>
  
  <ion-col></ion-col><ion-col></ion-col>
  
  
  
  </ion-row>
  </ion-grid >
  
          <div v-if="pageTitle==='plans'" id="app">
         
            <ion-grid  >
          
              <ion-row >
            <ion-col><strong>Week</strong> </ion-col>

            <ion-col><strong>Start</strong> </ion-col>
            
            <ion-col><strong>End</strong></ion-col>
            
            <ion-col></ion-col><ion-col></ion-col>
            
            
            
            
            </ion-row>
            </ion-grid >
          
            <ion-grid v-for="plan in plans" :key="plan.id" >
          
          
          
              <ion-row >
              <ion-col>{{plan.weekOfYear}}   </ion-col> 
              
              <ion-col>{{plan.start}} </ion-col>
              <ion-col>{{plan.end}} </ion-col>

            
              <ion-col >
                <router-link :to="`/showPlan/${plan.id}`">
                <ion-button  class="customButton" color="success">
                <ion-label ><ion-icon :icon="eye"></ion-icon
                ></ion-label>
                </ion-button>
              </router-link>
                </ion-col>
              <ion-col >
              <ion-button  class="customButton" color="danger" @click="deletePlan(plan.id)">
              <ion-label ><ion-icon :icon="trash"></ion-icon
              ></ion-label>
              </ion-button>
              
              </ion-col>
              
              
                
              
              </ion-row>
              </ion-grid>
              
              
          </div>
  
        </div>
       
      </div>
    
      
    
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { alertController, IonButtons, IonContent, IonHeader, IonMenuButton, 
  IonPage, IonTitle, IonToolbar,IonRadio,IonRadioGroup,IonBackButton, toastController} from '@ionic/vue';
import{addOutline,create,eye,trash,home,logoAndroid,logoApple,person,call,
  logoGoogle,bicycleOutline, closeCircle,location,card,personCircle,calendarOutline}from "ionicons/icons";
import axios from 'axios';



export default defineComponent({
  name: 'FolderPage',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,IonRadio,IonRadioGroup,IonBackButton
  },


  created() {
 

    


    

    axios.get("http://127.0.0.1:8000/api/planDays").then((response) => {
  
  this.planDays = response.data;


  
});

    if (this.pageTitle === 'plans' || this.pageTitle === 'employes') {
    axios.get("http://127.0.0.1:8000/api/plans").then((response) => {
  
  this.plans = response.data;


  
});

  }





    if (this.pageTitle === 'rounds') {
    axios.get("http://127.0.0.1:8000/api/rounds").then((response) => {
  
  this.rounds = response.data;


  
});

  }



    


  
    axios.get("http://127.0.0.1:8000/api/employes").then((response) => {
  
  this.employes = response.data;

 

  
});





  if (this.pageTitle === 'rounds') {
    axios.get("http://127.0.0.1:8000/api/rounds").then((response) => {
  
  this.rounds = response.data;


  
});

  }
  },
  data() {
    return {
      employes :[],rounds:[],plans:[],showPlansList:false,assignmentsPlan:[],person,call,location,
      selectedDay:0,showAssignmentsList:false,planEmployes:[],planRounds:[],personCircle,calendarOutline,
      assignments:[],idEmploye:0,pageTitle:this.$route.params.id,
      addOutline,bicycleOutline,create,closeCircle,eye,trash,home,available:1,roundsNumber:0,
      logoAndroid,logoApple,logoGoogle,card,plansNumber:0,planDays:[],dailyRounds:0,
    }
  },
  methods: {


    async toastAffectedDestination() {
      const toast = await toastController
        .create({
          header: 'This destination already affected in this day',
          duration: 2500,
          position: 'top',
          color: 'danger',
         
          
        
        })
      
      return toast.present();
    },







    async openToastDuplicatedPlan() {
      const toast = await toastController
        .create({
          header: 'Week plan already added , delete the current plan or wait for the next week',
          duration: 2500,
          position: 'top',
          color: 'danger',
         
          
        
        })
      
      return toast.present();
    },

    async openToastEmployes() {
      const toast = await toastController
        .create({
          header: '25 Employes already added',
          duration: 2500,
          position: 'top',
          color: 'danger',
         
          
        
        })
      
      return toast.present();
    },
    async openToastAddedRounds() {
      const toast = await toastController
        .create({
          header: '20 Rounds already added',
          duration: 2500,
          position: 'top',
          color: 'danger',
         
          
        
        })
      
      return toast.present();
    },

    async openToastRounds() {
      const toast = await toastController
        .create({
          header: 'Employe is busy',
          duration: 2500,
          position: 'top',
          color: 'danger',
         
          
        
        })
      
      return toast.present();
    },
    backToEmployes(){

      this.showPlansList = false;
    },
async enablePlans(employeId : any){
  axios.get("http://127.0.0.1:8000/api/getEmploye/"+employeId).then( (rsp) => {
    this.available = rsp.data;

    axios.get("http://127.0.0.1:8000/api/getRoundsNumber").then((response) => {
  
  this.roundsNumber = response.data;


  
});
    if (this.available) {
  



         if (this.roundsNumber<19) {
          this.showPlansList = true;
     this.idEmploye = employeId;
         } else {
          this.openToastAddedRounds();
         }





  } else {
    this.openToastRounds();
    this.roundsNumber=0;
  } 
  });
  
  
},

  
async addRound(){
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          message: 'Nouvelle Tour' ,
          inputs: [
         
         {
           label: 'Bni Khdache',
  
           type: 'radio',
           value: '4568Bni Khdache',
           name: 'destination',
         },
         
         {
           label: 'Ben Guerdane',
           type: 'radio',
           value:'5656Ben Guerdane',
           name: 'destination'
         },   {
           label: 'Sidi Makhlouf',
    
           type: 'radio',
           value: '6636Sidi Makhlouf',
           name: 'destination'
         },   {
           label: 'Zarzis',
         
           type: 'radio',
           value: '9987Zarzis',
           name: 'destination'
         },   {
           label: 'Medenine de sud',
         
           type: 'radio',
           value: '5412Medenine de sud',
           name: 'destination'
         },{
           label: 'Ajim',
           
           type: 'radio',
           value: '4118Ajim',
           name: 'destination'
         },
         {
           label: 'Midoun',
         
           type: 'radio',
           value: '3214Midoun',
           name: 'destination'
         },
         {
           label: 'Houmt souk',
           
           type: 'radio',
           value: '1210Houmt souk',
           name: 'destination'
         },
       
       
       ],
          buttons: [
              {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
              }
            ,
            {
               text: 'ajouter',
               handler:(data:string) => { 


                axios.post("http://127.0.0.1:8000/api/dailyRounds",
                 {

                  day_id : this.selectedDay,
                 zip_code : parseInt( data.substring(0, 4)),

}
                ).then((resp: any) => {


                  this.dailyRounds = resp.data;



                  
if (this.dailyRounds===0) {
  axios.post("http://127.0.0.1:8000/api/addRound",
                 {

                id : this.idEmploye,
               
                 destination :  data.substring(4, data.length),

                 zip_code : parseInt( data.substring(0, 4)),

}
                ).then((resp: any) => {
       
    





    axios.post("http://127.0.0.1:8000/api/addAssignement/",
      {
        employe_id : this.idEmploye,
        round_id : resp.data,
        day_id : this.selectedDay,

      
     }).then((resp) => {
        
    this.assignments = resp.data;
   
  }).catch(error => {
    console.log(error);
}); 






    axios.put("http://127.0.0.1:8000/api/setToBusy/"+this.idEmploye,
      {
       idEmploye : this.idEmploye,
      
      
      
     }).then((response) => {
        this.employes =  response.data;
        this.showPlansList = false;



        axios.post("http://127.0.0.1:8000/api/assignements",{dayId :this.selectedDay}).then((response) => {
  
  this.assignments = response.data;

  
  

 

});
}).catch(error => {
    console.log(error);
}); 









    
}).catch((error: any) => {
    console.log(error);
}); 

} else {
      this.toastAffectedDestination();
}

                });




               }
              
            },
          ] ,

        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
 

    },
  





    async updateRound(id : any , destination: any, zip_code: any){
  const alert = await alertController.create({
      cssClass: 'my-custom-class',
      message: 'Modifier Tour',





      inputs: [
        { 
          type: 'text',
          value:destination ,
          name:'destination',
          
         


          
          
        },
         {
          type: 'text',
          value: zip_code,
          name:'zip_code'
        }
       
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Annuler');
          }
        }, {
          text: 'Ok',
          handler: (data) => {

    axios.put("http://127.0.0.1:8000/api/roundUpdate/"+id,
      {
        id,
       destination :data.destination,
       zip_code : data.zip_code , 
        
      
      
     }).then((response) => {
        this.rounds =  response.data;
       
    
}).catch(error => {
    console.log(error);
}); 
               
      






            }
          }
        
      ]
    });

    await alert.present();

},



    async deleteRound(id : any){
  let alert = await alertController.create({
    message: 'vous-etes sur ?',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
       
      },
      {
        text: 'Confirmer',
        handler: () => {
           axios.delete(`http://127.0.0.1:8000/api/deleteRound/${id}`).then(() => {
                     this.rounds= this.rounds.filter((round: any) => round.id != id);

      });

      
      
        }
      }
    ]
  });
  await alert.present();


},

async deletePlan(id : any){
  let alert = await alertController.create({
    message: 'vous-etes sur ?',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
       
      },
      {
        text: 'Confirmer',
        handler: () => {
           axios.delete(`http://127.0.0.1:8000/api/deletePlan/${id}`).then(() => {
                     this.plans= this.plans.filter((plan: any) => plan.id != id);

      });

      
      
        }
      }
    ]
  });
  await alert.present();


},



async deleteEmploye(id : any){
  let alert = await alertController.create({
    message: 'vous-etes sur ?',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
       
      },
      {
        text: 'Confirmer',
        handler: () => {
           axios.delete(`http://127.0.0.1:8000/api/deleteEmploye/${id}`).then(() => {
                     this.employes= this.employes.filter((employe: any) => employe.id != id);

      });

      
      
        }
      }
    ]
  });
  await alert.present();


},


async updateEmploye(id : any , name: any, tel: any){
  const alert = await alertController.create({
      cssClass: 'my-custom-class',
      message: 'Modifier Employe',





      inputs: [
        { 
          type: 'text',
          value:name ,
          name:'name',
          
         


          
          
        },
         {
          type: 'text',
          value: tel,
          name:'tel'
        }
       
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Annuler');
          }
        }, {
          text: 'Ok',
          handler: (data) => {

    axios.put("http://127.0.0.1:8000/api/employeUpdate/"+id,
      {
        id,
       name :data.name,
       tel : data.tel , 
        
      
      
     }).then((response) => {
        this.employes =  response.data;
       
    
}).catch(error => {
    console.log(error);
}); 
               
      






            }
          }
        
      ]
    });

    await alert.present();

},




    async addEmploye(){
     if (this.employes.length < 25) {
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          message: 'Nouveau Employe' ,
          inputs: [
        { 
          name: 'nom',
          placeholder: 'nom',
         
          
        },
        { 
          name: 'tel',
          placeholder: 'telephone ',
         
          
        }
      ],
          buttons: [
              {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
              }
            ,
            {
               text: 'ajouter',
               handler:(data) => { 
                axios.post("http://127.0.0.1:8000/api/addEmploye",
                 {

         
               
              tel : data.tel,

              name : data.nom,

}
                ).then((resp: any) => {
       
    this.employes = resp.data;
}).catch((error: any) => {
    console.log(error);
}); 
          }
              
            },
          ] ,

        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
 

     } else {
      this.openToastEmployes();
     }
    },













    

    async addPlan(){
     
      axios.get("http://127.0.0.1:8000/api/verifyPlan").then(async (response) => {
  
  this.plansNumber = response.data;
  if (this.plansNumber >0) {
       this.openToastDuplicatedPlan();
       this.plansNumber =0;
      } else {
        const alert = await alertController
        .create({
       
          header: 'You are on the point of adding the week planning' ,
       
          buttons: [
              {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
              }
            ,
            {
               text: 'Confirm',
               handler:(data) => { 
                axios.post("http://127.0.0.1:8000/api/addPlan",
                ).then((resp: any) => {
       
    this.plans = resp.data;
}).catch((error: any) => {
    console.log(error);
}); 

          }
              
            },
          ] ,

        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
 
 
      }

  
});

    
     
    }
  },
});
</script>

<style scoped>

 
  .customButton {
    --padding-start: 10px;
      --padding-end: 10px;
      height: 27px;
     }
     
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
