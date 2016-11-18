/**
 * Created by jrue on 16/11/18.
 */

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Image,
  StyleSheet,
  Text,
  PixelRatio,
  TouchableHighlight,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  columnContainer: {
    flexDirection: 'column',
  },
  rowContainer: {
    flex: 1,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  startContainer: {
    flex:0.4,
    marginRight: 8,
    marginLeft: 14,
  },
  endContainer: {
    flex:0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: 'black',
  },
  textTitle: {
    fontSize: 17,
  },
  textTitleSub: {
    fontSize: 14,
  },
  textTitleEnd: {
    color: 'gray',
    textAlign: 'right',
  },
  textSummary: {
    marginTop: 2,
    color: 'gray',
  },
  endTextStyle:{
    right:5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class CommonItemView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { backgroundColor, iconStart, iconEnd, title, titleStyle, titleSub, titleEnd, titleEndStyle, renderEnd, summary, isFirst, isEnd } = this.props;

    const textTitleStyle = [styles.textTitle];
    if (titleStyle) {
      textTitleStyle.push(titleStyle);
    } else {
      textTitleStyle.push({ color: 'black' });
    }

    const textTitleEndStyle = [styles.textTitleEnd];
    if (titleEndStyle) {
      textTitleEndStyle.push(titleEndStyle);
    } else {
      textTitleEndStyle.push({ color: 'gray' });
    }

    let elemIconStart;
    if (iconStart) {
      elemIconStart = (<Image style={[styles.startContainer]} source={iconStart}/>);
    }

    let elemTitle;
    let elemTitleSub;
    if (titleSub) {
      elemTitle = (<Text style={[styles.text, textTitleStyle]} numberOfLines={1}>{title}</Text>);
      elemTitleSub = (<Text style={[styles.text, styles.textTitleSub]} numberOfLines={1}>{titleSub}</Text>);
    } else {
      elemTitle = (<Text style={[styles.text, textTitleStyle]} numberOfLines={1}>{title}</Text>);
    }

    let elemSummary;
    if (summary) {
      elemSummary = (<Text style={[styles.text, styles.textSummary]}>{summary}</Text>);
    }

    let elemEnd;
    if (titleEnd && iconEnd) {
      elemEnd = (
        <View style={styles.endContainer}>
          <View style={styles.endTextStyle} >
            <Text style={[ styles.text, textTitleEndStyle]} numberOfLines={1}>
              {titleEnd}
            </Text>
          </View>

          <Image style={[]} source={iconEnd}/>
        </View>
      );
    } else if (iconEnd) {
      elemEnd = (<Image style={[]} source={iconEnd}/>);
    } else if (titleEnd) {
      elemEnd = (
        <Text style={[styles.endContainer, styles.text, textTitleEndStyle]} numberOfLines={1}>
          {titleEnd}
        </Text>
      );
    }

    const rowContainerStyle = [styles.rowContainer];
    if (elemSummary || elemIconStart) {
      rowContainerStyle.push({ height: 64 });
    } else {
      rowContainerStyle.push({ height: 60 });
    }

    const lineColor = '#CECED2';
    const lineWidth = 1 / PixelRatio.get();
    const sepStyle = {
      height: 1,
      borderColor: lineColor,
    };
    return (
      <View style={{backgroundColor:backgroundColor ? backgroundColor:'white'}}>
        <TouchableHighlight
          underlayColor={ lineColor }
          onPress={this.props.onPress}>
          <View>
            <View style={[sepStyle, {
            borderTopWidth: (isFirst ? lineWidth : 0),
          }]}
            />
            <View style={rowContainerStyle}>
              {elemIconStart}
              <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                  {elemTitle}
                  {elemTitleSub}
                </View>
                {elemSummary}
              </View>
              {elemEnd}
            </View>
            <View style={[sepStyle, { borderBottomWidth: (isEnd ? 0 : lineWidth)}]}/>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
CommonItemView.propTypes = {
  iconStart: PropTypes.number,
  iconEnd: PropTypes.number,
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  titleSub: PropTypes.string,
  titleEnd: PropTypes.string,
  titleEndColor: PropTypes.string,
  renderEnd: PropTypes.func,
  summary: PropTypes.string,
  onPress: PropTypes.func,
  onDelete: PropTypes.func,
  onScroll: PropTypes.func,
};

module.exports = CommonItemView;
