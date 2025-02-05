import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, View, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import rand from "../../utils/rand";
import { useRoute } from "@react-navigation/core";
import { postData } from "../../utils/api";

const hiragana = [
    { latin: "1", char: " " },
    { latin: "2", char: " " },
    { latin: "3", char: " " },
    { latin: "4", char: " " },
    { latin: "5", char: " " },
];

export const PracticeScreen = () => {
    const route = useRoute();
    const [questionLib, setQuestionLib] = useState(hiragana);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await postData("questionLib", {
                    type: route.params?.type,
                });
                if (data) {
                    setQuestionLib(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [route.params?.type]);

    useEffect(() => {
        setQuestion(generateQuestion());
        setupNewQuestion();
    }, [questionLib]);


    const generateQuestion = () => {
        return questionLib[rand(0, questionLib.length - 1)];
    }

    const generateAnswers = (question: { latin: string, char: string }) => {
        let newAnswers: React.SetStateAction<string[]> = [];
        while (true) {
            let randAnswer = questionLib[rand(0, questionLib.length - 1)].latin;

            if (!newAnswers.includes(randAnswer) && randAnswer != question.latin) {
                newAnswers.push(randAnswer);
            }

            if (newAnswers.length == 4) {
                break;
            }
        }

        let correctPos = rand(0, 3);

        newAnswers[correctPos] = question.latin;
        return { correctPos, newAnswers };
    }

    const [streak, setStreak] = useState(0);
    const [question, setQuestion] = useState(generateQuestion);
    let { correctPos, newAnswers } = generateAnswers(question);
    const [correct, setCorrect] = useState(correctPos);
    const [answers, setAnswers] = useState(newAnswers);
    const [answerBackground, setAnswerBackground] = useState(["white", "white", "white", "white"]);


    const handleAnswer = (index: number) => {
        if (index == correct) {
            setStreak(streak + 1);
        } else {
            setStreak(0);
        }

        setAnswerBackground(answerBackground.map((_, i) => i == correct ? "rgba(0, 52, 200, 0.1)" : "white"));
        setTimeout(setupNewQuestion, 1500);
    }

    const setupNewQuestion = () => {
        let newQuestion = generateQuestion();
        let { correctPos, newAnswers } = generateAnswers(newQuestion);

        setAnswerBackground(["white", "white", "white", "white"]);
        setCorrect(correctPos);
        setQuestion(newQuestion);
        setAnswers(newAnswers);

        console.log("Char: ", question.char);
        console.log("Answer: ", JSON.stringify(answers));
    }

    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" />
            <View style={styles.body}>
                <View style={styles.streak}>
                    <Image style={styles.streakIcon} source={require("../../../assets/icons/fire.png")} />
                    <View style={styles.streakLabel}>
                        <Text>{streak} streaks</Text>
                    </View>
                </View>
                <Text style={styles.question}>{question.char}</Text>
                <View style={styles.answers}>
                    <View style={{ flexDirection: "row" }}>
                        <Pressable style={[styles.answer, { backgroundColor: answerBackground[0] }]} onPress={() => handleAnswer(0)}>
                            <Text style={styles.answerContent}>{answers[0]}</Text>
                        </Pressable>
                        <Pressable style={[styles.answer, { backgroundColor: answerBackground[1] }]} onPress={() => handleAnswer(1)}>
                            <Text style={styles.answerContent}>{answers[1]}</Text>
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Pressable style={[styles.answer, { backgroundColor: answerBackground[2] }]} onPress={() => handleAnswer(2)}>
                            <Text style={styles.answerContent}>{answers[2]}</Text>
                        </Pressable>
                        <Pressable style={[styles.answer, { backgroundColor: answerBackground[3] }]} onPress={() => handleAnswer(3)}>
                            <Text style={styles.answerContent}>{answers[3]}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
        height: "110%",
        backgroundColor: "rgb(248, 250, 253)",
    },
    question: {
        fontSize: 250,
        textAlign: "center",
        fontWeight: "500",
        marginTop: 70,
        marginBottom: 25,
    },
    answers: {
        alignItems: "center",
        justifyContent: "space-between",
    },
    answer: {
        backgroundColor: "white",
        margin: 5,
        padding: 16,
        borderRadius: 15,
        width: "45%",
        height: 200,
        justifyContent: "center",
    },
    answerContent: {
        color: "rgba(0, 52, 200, 0.75)",
        textAlign: "center",
        fontSize: 75,
    },
    streak: {
        margin: 15,
        padding: 7,
        width: 120,
        borderRadius: 30,
        flexDirection: "row",
        backgroundColor: "white",
        position: "absolute",
        right: 0,
    },
    streakIcon: {
        width: 25,
        height: 25,
        marginLeft: 5,
        marginRight: 7,
    },
    streakLabel: {
        justifyContent: "center",
    }
});