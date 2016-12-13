/*
 * @providesModule Component/index
 */

'use strict';
import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';

const Size = Dimensions.get('window');

export default class Bouncer extends Component {

 onScroll = event => {

   let offsetY = event.nativeEvent.contentOffset.y;
   if(offsetY < -0.1) {
     let { width, height, } = this.props;
     let factor = (Math.abs(offsetY) + height)/height* width;

     ['img','scroll', 'container'].forEach(ref=>{
        this.refs[ref].setNativeProps({
          style: {
             left: 0,
             top: ref === 'img' ? offsetY : 0,
             width: factor,
             height: height + Math.abs(offsetY),
          }
        });
     });
   }
 }

  render() {
    const { width, height, url,} = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.content, {width: width, height: height,}]}
          ref="container">
          <ScrollView
            onScroll={this.onScroll}
            scrollEventThrottle={10}
            bouncesZoom={false}
            ref="scroll">
            <Image style={{width: width, height: height,}}
              source={{uri: url}}
              ref="img" />
          </ScrollView>
        </View>
      </View>
    );
  }
}

Bouncer.defaultProps = {
  width: Size.width,
  height: Size.height,
};

Bouncer.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  url: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
