import React from 'react';
import {View, ListView, StyleSheet} from 'react-native';
import SearchBar from './SearchBar';
import EmployeeListItem from './EmployeeListItem';
import * as employeeService from './services/employee-service-mock';

export default class EmployeeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})};
        employeeService.findAll().then(employees => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(employees)
            });
        });
    }

    search(key) {
        employeeService.findByName(key).then(employees => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(employees)
            });
        });
    }
    render() {
        return (
            <ListView style={styles.container}
                      dataSource={this.state.dataSource}
                      enableEmptySections={true}
                      renderRow={(data) => <View style = {styles.row}><EmployeeListItem navigator={this.props.navigator} data={data} /></View>}
                      renderSeparator={(sectionId, rowId) => <View key={rowId} />}
                      renderHeader={() => <SearchBar onChange={this.search.bind(this)} />}

            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#323232',
        marginTop: 60,
    },
    row: {
    marginTop: 30,
    borderColor: '#404040',
    borderWidth : 0.02,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderBottomWidth: 2,
    shadowColor: '#a8a8a8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    }
});