<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title></ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content :fullscreen="true">
     
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large"></ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-item >
          <ion-item >
            <ion-buttons >
              <ion-back-button color="primary" default-href="/" ></ion-back-button>
              
              </ion-buttons> 
          </ion-item>
            
          
           

            &nbsp;  &nbsp; <ion-label > {{assignmentsPlan.start}} - {{assignmentsPlan.end}} </ion-label>


          </ion-item>
           
          <div class="ion-padding" >
            <ion-grid>
<ion-row>

<ion-col>

<ion-grid>
  <ion-row>
    <ion-col>
      <ion-icon :icon="person" color="primary"></ion-icon> 
    </ion-col>
  </ion-row>
</ion-grid>

</ion-col>
<ion-col>

  <ion-grid>
    <ion-row>
      <ion-col>
        <ion-icon :icon="call" color="primary"></ion-icon> 
      </ion-col>
    </ion-row>
  </ion-grid>
  
  </ion-col>
  <ion-col>

    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-icon :icon="location" color="primary"></ion-icon> 
        </ion-col>
      </ion-row>
    </ion-grid>
    
    </ion-col>
    <ion-col>

      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-icon :icon="calendarOutline" color="primary"></ion-icon> 
          </ion-col>
        </ion-row>
      </ion-grid>
      
      </ion-col>
</ion-row>







<ion-row>

  <ion-col>
  <ion-grid>
    <ion-row   v-for="(employe) in planEmployes" :key="employe.id"
    >
      <ion-col>
      {{employe.name}}
      </ion-col>
    </ion-row>
  </ion-grid>
  
  </ion-col>
  <ion-col>
  
    <ion-grid>
      <ion-row  v-for="(employe) in planEmployes" :key="employe.id">
        <ion-col>
         {{employe.tel}}
        </ion-col>
      </ion-row>
    </ion-grid>
    
    </ion-col>
    <ion-col>
  
      <ion-grid>
        <ion-row  v-for="(round) in planRounds" :key="round.id">
          <ion-col>
            {{round.destination}}
          </ion-col>
        </ion-row>
      </ion-grid>
      
      </ion-col>
      <ion-col>
  
        <ion-grid>
          <ion-row  v-for="(day) in employesDays" :key="day.id">
            <ion-col>
              {{day.label}}   &nbsp; {{day.date.substring(5, 10)}}
            </ion-col>
          </ion-row>
        </ion-grid>
        
        </ion-col>
        
  </ion-row>



            </ion-grid >
       
          
         
       
   
               
          </div>
            
         
          

  
    
      
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
import { defineComponent } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, 
  IonPage, IonTitle, IonToolbar,IonBackButton} from '@ionic/vue';
import{addOutline,create,eye,trash,home,logoAndroid,logoApple,person,call,
  logoGoogle,bicycleOutline, closeCircle,location,calendarOutline}from "ionicons/icons";
import axios from 'axios';
import router from '@/router';
  export default defineComponent({
    name: 'showPlan',
    components: {
      IonButtons,
      IonContent,
      IonHeader,
      IonMenuButton,
      IonPage,
      IonTitle,
      IonToolbar,IonBackButton
    },  

    created() {

      axios.get("http://127.0.0.1:8000/api/assignmentsPlan/"+this.planId).then(response=>
      {
        this.assignmentsPlan=response.data;
      
axios.post("http://127.0.0.1:8000/api/planEmployes",{planId : this.planId}).then((response) => {

this.planEmployes = response.data;
this.planEmployes.forEach(employe => {
  this.planEmployesIds.push(employe['id']);
});

axios.post("http://127.0.0.1:8000/api/getDay",{ids : this.planEmployesIds}).then((response) => {

this.employesDays= response.data;

this.planEmployesIds.splice(0, this.planEmployesIds.length);

});

});
      
      
axios.post("http://127.0.0.1:8000/api/planRounds",{planId : this.planId}).then((response) => {

this.planRounds= response.data;



});   
     
  
      }
      );







    },
data() {
    return {
      employes :[],rounds:[],plans:[],assignmentsPlan:[],person,call,location,
      selectedPlan:0,planEmployes:[],planRounds:[],planEmployesIds:[],employesDays:[],
      assignments:[],idEmploye:0,planId:this.$route.params.id,
      addOutline,bicycleOutline,create,closeCircle,eye,trash,home,
      logoAndroid,logoApple,logoGoogle,calendarOutline    }
  },
    methods: {
      


  
backToPlans(){
  router.go(-1);
},

  
  

  


  
  

  

  
  
  
    
    
   
    },
  });
  </script>
  
  <style scoped>
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
  