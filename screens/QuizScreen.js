import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView
} from "react-native";
import React from "react";
import { List, ListItem } from "native-base";

const { width, height } = Dimensions.get("window");
let arrnew = [];
const jsonData = {
  quiz: {
    question1: {
      correctoption: "2009",
      options: {
        option1: "2001",
        option2: "2009",
        option3: "1949",
        option4: "1984"
      },
      question: "In what year did the area became largely car-free ?",
      answer:
        "The area became largely car-free in 2009, with temporary pedestrian plazas and the closing of Broadway to automobiles."
    },
    question2: {
      correctoption: "340,000",
      options: {
        option1: "340,000",
        option2: "1,000,000",
        option3: "530,000",
        option4: "97,234"
      },
      question:
        "How many pedestrians pass through Times Square on a typical day?",
      answer:
        "On an average day around 340,000 pedestrains pass through Time Sqaure, which makes it one of the worlds most visited tourist attractions"
    },
    question3: {
      correctoption: "true",
      options: {
        option1: "true",
        option2: "false"
      },
      question: `"Sardi's" is a very popular restaurant on "Restaurant Row", where famous celebrity caricature drawings line the walls. True or false?`,
      answer: `Known for the hundreds of caricatures of show-business celebrities that adorn its walls, Sardi's opened at its current location on March 5, 1927.`
    },
    question4: {
      correctoption: "1904",
      options: {
        option1: "1976",
        option2: "1919",
        option3: "1904",
        option4: "1956"
      },
      question:
        "In what year did the New York Times bring this area to life, by opening its offices atop a subway station?",
      answer:
        "Times Sqaure was renamed from Longacre Sqaure in 1904, when the New York Times opened up an office in the area"
    },
    question5: {
      correctoption: "141 feet",
      options: {
        option1: "121 feet",
        option2: "168 feet",
        option3: "141 feet",
        option4: "500 feet"
      },
      question: `How far does the ball in Times Square drop on New Years Eve?`,
      answer: `The ball drops 141 feet on New Years Eve, and the New Years Eve party was originally invented by the New York Times, and celebrated in Trinity Church in 1904. The event was originally created to attract people to the area.`
    }
  }
};
export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.qno = 0;
    this.score = 0;
    const jdata = jsonData.quiz;
    arrnew = Object.keys(jdata).map(function(k) {
      return jdata[k];
    });
    //console.log(jdata);
    //console.log(arrnew[1].answers);

    this.state = {
      question: arrnew[this.qno].question,
      answers: arrnew[this.qno].answer,
      options: arrnew[this.qno].options,
      correctoption: arrnew[this.qno].correctoption,
      quizComplete: false,
      viewAnswers: false
    };
  }
  prev() {
    if (this.qno > 0) {
      this.qno--;
      this.setState({
        question: arrnew[this.qno].question,
        options: arrnew[this.qno].options,
        correctoption: arrnew[this.qno].correctoption
      });
    }
  }
  next() {
    if (this.qno < arrnew.length - 1) {
      this.qno++;
      this.setState({
        question: arrnew[this.qno].question,
        options: arrnew[this.qno].options,
        correctoption: arrnew[this.qno].correctoption
      });
    } else {
      this.setState({
        quizComplete: true
      });
    }
  }

  checkAns(choice, ans) {
    if (choice === ans) {
      console.log("correct");
      this.score += 1;
    }
    this.next();
  }

  resetGame() {
    this.score = 0;
    this.qno = 0;

    this.setState({
      question: arrnew[this.qno].question,
      options: arrnew[this.qno].options,
      correctoption: arrnew[this.qno].correctoption,
      quizComplete: false,
      viewAnswers: false
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    let _this = this;
    const currentOptions = this.state.options;
    const correctoption = this.state.correctoption;
    const options = Object.keys(currentOptions).map(function(k) {
      return (
        <View key={k} style={{ margin: 10 }}>
          <Button
            title={currentOptions[k]}
            onPress={() => _this.checkAns(currentOptions[k], correctoption)}
          />
        </View>
      );
    });

    if (this.state.quizComplete && !this.state.viewAnswers) {
      return (
        <View style={{ paddingTop: 50 }}>
          <Text>Congrats Your Score is: {this.score}/5</Text>
          <Text>Retake Quiz?</Text>
          <Button title="yes" onPress={() => this.resetGame()} />
          <Button title="no" onPress={() => navigate("Home")} />
          <Text>Answers</Text>
          <Button
            title="view answers"
            onPress={() => {
              this.setState({
                viewAnswers: true
              });
            }}
          />
        </View>
      );
    }

    if (this.state.viewAnswers) {
      return (
        <View style={{ paddingTop: 50 }}>
          {arrnew.map(i => {
            return <Text>{i["answer"]}</Text>;
          })}

          <Button
            title="go back"
            onPress={() => {
              this.setState({
                viewAnswers: false
              });
            }}
          />
        </View>
      );
    }

    return (
      <ScrollView style={{ paddingTop: 10 }}>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View style={{ margin: 10 }}>
              <Text>{this.state.question}</Text>
            </View>
            <View>{options}</View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ margin: 15 }} />

              <View style={{ flexDirection: "row" }} />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  oval: {
    width: (width * 90) / 100,
    borderRadius: 20,
    backgroundColor: "green"
  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    margin: 15,
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
