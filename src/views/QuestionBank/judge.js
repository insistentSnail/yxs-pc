const types = {
  "1": (answer, userAnswer) => {
    // 单选题
    return (
      answer.toLocaleUpperCase().trim() ===
      userAnswer.toLocaleUpperCase().trim()
    );
  },
  "2": (answer, userAnswer) => {
    // 多选题
    return (
      JSON.parse(answer)
        .map(item => item.toLocaleUpperCase().trim())
        .sort()
        .join("") ===
      JSON.parse(userAnswer)
        .map(item => item.toLocaleUpperCase().trim())
        .sort()
        .join("")
    );
  },
  "3": (answer, userAnswer) => {
    // 不定选择题
    return (
      JSON.parse(answer)
        .map(item => item.toLocaleUpperCase().trim())
        .sort()
        .join("") ===
      JSON.parse(userAnswer)
        .map(item => item.toLocaleUpperCase().trim())
        .sort()
        .join("")
    );
  },
  "4": (answer, userAnswer) => {
    // 判断题
    answer = answer + "";
    userAnswer = userAnswer + "";
    const correct = ["true", "对", "正确", "是", "1"];
    const error = ["false", "错", "错误", "0"];
    if (!correct.includes(userAnswer) && !error.includes(userAnswer))
      throw new Error("错误的判断题答案:" + userAnswer);
    return (
      (correct.includes(answer) && correct.includes(userAnswer)) ||
      (error.includes(answer) && error.includes(userAnswer))
    );
  },
  "5": (answer, userAnswer) => {
    // 填空题
    return (
      JSON.parse(answer)
        .map(item =>
          item
            .split("")
            .filter(item => item.trim())
            .join("")
        )
        .join("") ===
      JSON.parse(userAnswer)
        .map(item =>
          item
            .split("")
            .filter(item => item.trim())
            .join("")
        )
        .join("")
    );
  }
};
export default ansInfo => {
  try {
    return types[String(ansInfo.type)](ansInfo.answer, ansInfo.userAnswer);
  } catch (e) {
    console.error("试题判断错误", e);
  }
};
