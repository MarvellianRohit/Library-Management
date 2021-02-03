import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permission from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermission:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal'
    }
  }
  
  getCameraPermissions = async()=> {
    const{status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions:status === 'granted' 
    })
  }

  handleBarCodeScanned = async({type,data})=> {
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:'normal'
    })
  }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;
        
      if(buttonState === 'clicked' & hasCameraPermissions){
          return(
            <BarCodeScanner
            onBarCodeScanned = {scanned? undefined :this.handleBarCodeScanned}
            style = {StyleSheet.absoluteFillObject}
            />
          )
        }

        else if(buttonState === "normal"){

      return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style = {styles.displayText}>
            {hasCameraPermissions === true ? this.state.scannedData:"requestCameraPermission"}
            Dummy QR CODE</Text>

          <TouchableOpacity onPress ={this.getCameraPermissions} style = {styles.scanButton} >
            <Text style = {styles.buttonText} >Scan the QR code</Text>
          </TouchableOpacity>
        
        </View>
      );
    }
  }
}

  const Styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:'center',
      alignIcons:'center',
    },

    //styling to display text
    displayText: {
      fontSize:15,
      textDecorationLine:'underline'
    },

    //styling to the scan button
    scanButton: {
      backgroundColor:'cyan',
      padding:10,
      margin:10
    }
  })