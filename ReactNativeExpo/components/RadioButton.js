import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class RadioButtons extends Component {
    constructor(props) {
         super(props);
         this.state = {value: props.preset};
    }
    updateParentState(data) {
            this.props.updateParentState(data);
        }
	render() {
		const { options } = this.props;
		const { value } = this.state;

		return (
			<View style={styles.fcontainer}>
				{options.map(item => {
					return (
						<View key={item.key} style={styles.buttonContainer}>

							<TouchableOpacity
								style={styles.circle}
								onPress={() => {
									this.setState({value: item.key});
									this.updateParentState({key: item.key});
								}}
							>
								{value === item.key && <View style={styles.checkedCircle} />}
							</TouchableOpacity>
							<Text>{item.text}</Text>
						</View>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	fcontainer: { flexDirection: 'row', justifyContent: 'space-around', marginLeft: 40, marginRight: 40, alignItems: 'center' },
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 30,
	},

	circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ACACAC',
		alignItems: 'center',
		justifyContent: 'center',
	},

	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: '#794F9B',
	},
});