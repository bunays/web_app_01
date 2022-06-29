import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseTrackingService {

 

  constructor(private realTimeDb: AngularFireDatabase) { }

  getRealTimeCoordinates(Id): Observable<any> {
    return this.realTimeDb.list<any>('/TRACK_ORDER',ref => ref.orderByChild('orderId').equalTo(Id)).valueChanges();
    
  }
}

// this.realTimeDb.database.ref("/messages/").on('child_changed', (t)=>{
    //   var markersRef =  this.realTimeDb.database.ref("/messages/"+t.key+"/").child("pos/")
    //   markersRef.on("child_added", (v)=>{
    //     let new_pos = v.val()
    //     marker.setLatLng([new_pos.lng,new_pos.long]).addTo(this.map)
    //     console.log(v.val())
    //   })
    //   markersRef.on("child_changed", (v)=>{
    //     console.log(v.val())
        
    //   })
      
    // })

/*


<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.8.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCEcCw_SBMmJpVhEXOS2WOeDBWhJayUIfQ",
    authDomain: "dizabo-30e07.firebaseapp.com",
    databaseURL: "https://dizabo-30e07.firebaseio.com",
    projectId: "dizabo-30e07",
    storageBucket: "dizabo-30e07.appspot.com",
    messagingSenderId: "815498101187",
    appId: "1:815498101187:web:7fe1aeb020f5c9f02e3d76",
    measurementId: "G-80G8248KW9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>

*/