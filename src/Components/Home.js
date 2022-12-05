import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { setDoc,doc, updateDoc,getDoc } from 'firebase/firestore';
import { CartContext } from '../Context/CartContext';
import {db,storage} from '../firebase'
// import { async } from '@firebase/util';
import {  ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
function Home() {
    const { logout } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const [name,setName]=useState('');
    const [review,setReview]=useState('');
    const [searchNum,setSearchNum]=useState(0);
    const [addNum,setAddNum]=useState(0);
    const [file,setFile]=useState(null);
    const [imageLink,setImageLink]=useState("");
    const [show,setShow]=useState(false);
    // console.log("user ",user.email);
    const navigate=useNavigate();
    useEffect(() => {
        if (user==''){
         navigate("/login")   
        }
    },[user])
  
    const Logout=async()=>{
        await logout();
        
       navigate("/login")
       
    }
    const handleReview=async()=>{
      console.log("handle review");
      let uid= "Id"+searchNum;
      const docData={
        Name:name,
        Review:review,
        Arr:[addNum]
      };
      console.log("docData -> ",docData);
     dispatch({
      type:'Print',
      doc:docData
     })
// Later...
try{
let res=await setDoc(doc(db, "Reviews", uid), docData);
console.log("save success");
}
catch(err)
{
  console.log("Fail save");
  console.log(err);
}
finally{
  console.log("finally");
}

    }
    const updateDoc=async()=>{
      let uid="Id"+searchNum;
      const ref = doc(db, "Reviews",uid );

      // Set the "capital" field of the city 'DC'
      try{
        
     setDoc(ref,{Arr:[addNum]},{merge:true});
     console.log("update Doc successful");
     setSearchNum(0);
      }catch(err)
      {
        console.log("update doc fail");
        console.log(err);
      }
     
    }
    const updateDocEle=async()=>{
      let uid="Id"+searchNum;
      const docRef = doc(db, "Reviews", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        let dataCome=docSnap.data();
      console.log(dataCome.Name);
      console.log(dataCome.Review);
      console.log(JSON.stringify(dataCome.Arr));
      let newArr=[...dataCome.Arr,addNum];
      console.log(JSON.stringify(newArr));
      
        let newData={
          Name:dataCome.Name,
          Review:dataCome.Review,
          Arr:newArr
        }
        console.log("NewData  "+JSON.stringify(newData));
        try{
          let res=await setDoc(doc(db, "Reviews", uid), newData);
          console.log("updateDocEle success");
          }
          catch(err)
          {
            console.log("Fail updateDocEle");
            console.log(err);
          }
          finally{
            console.log("finally updateDocEle");
          }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    const SaveImage=async()=>{
      const storageRef = ref(storage, `${user.email}/Profile`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // // Listen for state changes, errors, and completion of the upload.
      try{
        alert("Uploading Started");
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          alert("Upload fail");
            console.log(error)
        
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            alert("Upload Successfull");
            // let userData = {
            //   fullName,
            //   email,
            //   password,
            //   profilePhoto: downloadURL,
            //   uid: userInfo.user.uid,
            //   posts:[]
            // };

            // await setDoc(doc(db, "users", ), userData);
          });
        }
      );
      }
        // console.log("user signed up");
        catch (err) {
          console.log("err", err);
          // setError(err.code);
          setTimeout(() => {
            // setError('')
          }, 2000);
        }
    }
  const handleImg=()=>{
    
    getDownloadURL(ref(storage, `${user.email}/Profile`))
    .then((url) => {
      console.log("url "+url);
      setImageLink(url);
      setShow(!show)
    })
    .catch((error) => {
      // Handle any errors
    });
  }
   const {dispatch}=useContext(CartContext);
   const cart=useContext(CartContext); 
   const setObj=()=>{
    console.log("final1"+ cart.number+ " and "+cart.word);
    cart.number=100;
    cart.word="change";
    console.log("final2 "+cart.number+" and "+cart.word);
   
   }
   const giveObj=()=>{
    console.log("final3 "+cart.number+" and "+cart.word);
   }
  return (
    <div>
      <h1> Hello Home </h1>
      <input name="Name" type="text" placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} value={name} ></input>
      <textarea name="Name" type="text" placeholder='Enter your Review' onChange={(e)=>setReview(e.target.value)} value={review}></textarea>
      <input name="Numbers" type="value" placeholder='Search' onChange={(e)=>setSearchNum(e.target.value)}value={searchNum}></input>
      <input name="Numbers" type="value" placeholder='Add Number' onChange={(e)=>setAddNum(e.target.value)}value={addNum}></input>
      <button onClick={handleReview}>Add</button>
      <button onClick={updateDoc}>Update Doc</button>
      <button onClick={updateDocEle}>Update DocElement</button>
      <button onClick={setObj}>Set Info</button>
      <button onClick={giveObj}>Get Info</button>
      {/* <button onClick={handleReview}>Print all</button> */}
      <button onClick={Logout}>Logout</button>
      <h1>Upload Image</h1>
      <input accept="image/*" type="file" onChange={(e)=>setFile(e.target.files[0])}></input>
      <button onClick={SaveImage}>Save Image</button>
      <h3>Show Image</h3>
      <button onClick={handleImg}>Show Image</button>
      {(show==true)?
      <div>
        <h4>Image</h4>
      <img src={imageLink} alt="Photo" width="500" height="600"/>
      </div>:<div><h3>No Image</h3></div>}
    </div>
  )
}

export default Home
