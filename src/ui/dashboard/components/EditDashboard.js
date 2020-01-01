import React, { Component } from 'react';
import { ICON } from '../../common/constants/ImageConstant';
import { View, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native';
import { RenameDialog } from '../../common/customComponents/RenameDialog';
import _ from 'underscore';

class EditDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deviceName: "",
            isRenameDlg: false,
        }
    }

    componentDidMount() {
        let { selectedCard:{SSID} } = this.props;
        this.setState({deviceName: SSID});
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    onRenamingDevice = (text) => {
        this.setState({deviceName: text});
    }

    onRenamePress = () => {
        let { deviceList, deviceListAction, selectedCard } = this.props,
            {deviceName} = this.state;
        let newList = deviceList.map((item) => {
            let clonedItem = _.clone(item);
            if(item.Mac === selectedCard.Mac){
                clonedItem.SSID = deviceName;
            }
            return clonedItem;
        })
        this.renameDlgHadler();
        setTimeout(function(){
            deviceListAction(newList);
        })
    }

    renameDlgHadler = () =>{
        this.setState({isRenameDlg : !this.state.isRenameDlg});
    }

    handleBackButton = () => {
        if(this.state.isRenameDlg){
            this.renameDlgHadler();
            return true
        }
        else
            return false;
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    render() {
        let {deviceName, isRenameDlg} = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Image style={styles.img} source={ICON.HamburgerIcon} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image style={styles.img} source={ICON.HamburgerIcon} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image style={styles.img} source={ICON.HamburgerIcon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.renameDlgHadler()}>
                    <Image style={styles.img} source={ICON.HamburgerIcon} />
                </TouchableOpacity>

                <RenameDialog isDialogVisile={isRenameDlg}
                    dialogTitle={"Rename Device"}
                    btnName={"Rename"}
                    textTitle={"Enter Name"}
                    value={deviceName}
                    onChangeText={(text) => {this.onRenamingDevice(text)}}
                    btnPress={this.onRenamePress}/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5
    },
    img: {
        height: 20,
        width: 20
    }

})

export default EditDashboard;



