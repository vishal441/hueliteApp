import React, { Component } from 'react';
import { ICON } from '../../common/constants/ImageConstant';
import { View, Text, FlatList, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { RenameDialog } from '../../common/customComponents/RenameDialog';

class EditDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deviceName: "",
            isRenameDlg: false,
        }
    }

    componentDidMount() {
        let { selectedCard:{Mac} } = this.props;
        this.setState({deviceName: Mac});
    }

    onRenamingDevice = (text) => {
        this.setState({deviceName: text});
    }

    onRenamePress = () => {
        let { deviceList, deviceListAction, selectedCard } = this.props,
            {deviceName} = this.state;
        let newList = deviceList.map(item => {
            if(item.IP_Address === selectedCard.IP_Address){
                item.Mac = deviceName;
            }
            return item;
        })
        deviceListAction(newList);
        this.renameDlgHadler();
    }

    renameDlgHadler = () =>{
        this.setState({isRenameDlg : !this.state.isRenameDlg});
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



