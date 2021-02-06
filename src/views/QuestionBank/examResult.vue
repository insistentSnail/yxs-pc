<template>
  <div class="exam">
    <div class="Breadcrumb">
      <img src="@/assets/images/questionBank/location.png" alt="" />
      <span>{{ $route.query.name }} > </span>
      <span>{{ $route.query.type }} > </span>
      <span style="color:#333333"> {{ examInfo.title }}</span>
    </div>
    <div class="examContent">
      <div class="examContent-l">
        <div class="info">
          <div class="p1">
            {{ examInfo.title }}
          </div>
          <div class="p2">
            <span
              >总分：{{ examInfo.score }}分，共{{ examInfo.itemCount }}题</span
            >
            <span>答题限时：{{ examInfo.limitTime }}分钟</span>
          </div>
          <el-table
            :data="tableData"
            :span-method="objectSpanMethod"
            border
            style="width: 100%; margin-top: 20px"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="id" label="题型" width="80">
            </el-table-column>
            <el-table-column
              prop="name1"
              :label="'单选题(共' + singleChoiceList.length + '题)'"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="name2"
              :label="'多选题(共' + multipleChoiceList.length + '题)'"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="name3"
              :label="'判断题(共' + judgeList.length + '题)'"
              width="80"
            >
            </el-table-column>

            <el-table-column
              prop="name4"
              :label="'填空题(共' + gapList.length + '题)'"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="name5"
              :label="'问答题(共' + essayList.length + '题)'"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="name6"
              :label="'材料分析题(共' + analysisList.length + '题)'"
              width="80"
            >
            </el-table-column>

            <el-table-column
              prop="name7"
              :label="'总计(共' + examInfo.itemCount + '题)'"
              width="80"
            >
            </el-table-column>
            <el-table-column prop="score" label="总分">
              <template slot-scope="scope">
                <p style="color:#17A5F2;font-size:30px">
                  {{ scope.row.score }}
                </p>
                <p style="margin-top:15px">{{ scope.row.time }}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 题型切换 -->
        <div class="questionType">
          <ul>
            <li
              v-for="(item, index) in questionLists"
              :key="index"
              @click="currentIndex(index)"
            >
              <a
                v-if="index == 0"
                :class="questionIndex == index ? 'active' : ''"
                href="#sing"
              >
                {{ item }}
              </a>
              <a
                v-if="index == 1"
                :class="questionIndex == index ? 'active' : ''"
                href="#double"
              >
                {{ item }}
              </a>
              <a
                v-if="index == 2"
                :class="questionIndex == index ? 'active' : ''"
                href="#judge"
              >
                {{ item }}
              </a>
              <a
                v-if="index == 3"
                :class="questionIndex == index ? 'active' : ''"
                href="#tian"
              >
                {{ item }}
              </a>
              <a
                v-if="index == 4"
                :class="questionIndex == index ? 'active' : ''"
                href="#wen"
              >
                {{ item }}
              </a>
              <a
                v-if="index == 5"
                :class="questionIndex == index ? 'active' : ''"
                href="#cai"
              >
                {{ item }}
              </a>
            </li>
          </ul>
        </div>

        <!-- 主体内容 -->
        <div class="question-c">
          <!-- 单选题 -->
          <div
            class="singleChoise"
            id="sing"
            v-if="singleChoiceList.length > 0"
          >
            <div class="singleTitle">
              <div class="singleType">单选题</div>
              <!-- <div class="score">（共10题，共20分）</div> -->
            </div>
            <div
              class="ques"
              v-for="(item, index) in singleChoiceList"
              :key="index"
              :id="'single' + index"
            >
              <p>
                <span class="order">{{ index + 1 }}.</span>
                <span class="editor" v-html="item.content"></span>
                <span class="scoreNum">（{{ item.score }}分）</span>
              </p>
              <el-radio-group
                v-model="item.userAnswer"
                v-for="(ele, idx) in JSON.parse(item.optionsContent)"
                :key="idx"
              >
                <el-radio :label="ele.name" disabled
                  >{{ ele.name }}.
                  <span class="editor" v-html="ele.content"></span
                ></el-radio>
              </el-radio-group>

              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="correctDialog ? 'color:#FFA900' : ''"
                      >纠错</span
                    >
                  </div>
                  <div class="collect" @click="myCollect">
                    <img
                      :src="
                        isCollect
                          ? require('@/assets/images/questionBank/collectActive.png')
                          : require('@/assets/images/questionBank/collect.png')
                      "
                      alt=""
                    />
                    <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                  </div>
                  <div class="sign" @click="mySign">
                    <img
                      :src="
                        isSign
                          ? require('@/assets/images/questionBank/signActive.png')
                          : require('@/assets/images/questionBank/sign.png')
                      "
                      alt=""
                    />
                    <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                  </div>
                </div>
                <div class="analysis-r" @click="watchAnalysis(item)">
                  <span>查看解析</span>
                  <img src="@/assets/images/questionBank/open.png" alt="" />
                </div>
                <div class="analysisContent" v-if="item.analysisShow">
                  <div style="margin:10px 0" v-if="item.userAnswer">
                    <img
                      :src="
                        item.userAnswer == item.answer
                          ? require('@/assets/images/questionBank/trueBig.png')
                          : require('@/assets/images/questionBank/errorBig.png')
                      "
                      alt=""
                    />
                  </div>
                  <div class="myAnswer">
                    <div class="myAnswer-l">我的答案：</div>
                    <div class="myAnswer-r">
                      {{ item.userAnswer == null ? "未作答" : item.userAnswer }}
                    </div>
                  </div>
                  <div class="referenceAnswer">
                    <div class="referenceAnswer-l">参考答案：</div>
                    <div class="referenceAnswer-r">{{ item.answer }}</div>
                  </div>
                  <div class="answerResult">
                    <div class="answerResult-l">
                      <span>解</span>
                      <span style="margin-right: 6px;"> 析：</span>
                    </div>
                    <div class="answerResult-r">
                      {{ item.analysis }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 多选题 -->
          <div
            class="singleChoise"
            style="margin-top:30px"
            v-if="multipleChoiceList.length > 0"
            id="double"
          >
            <div class="singleTitle">
              <div class="singleType">多选题</div>
              <!-- <div class="score">（共5题，共20分）</div> -->
            </div>
            <div
              class="ques"
              v-for="(item, index) in multipleChoiceList"
              :key="item.id"
              :id="'multiple' + index"
            >
              <p>
                <span class="order"
                  >{{ singleChoiceList.length + index + 1 }}.</span
                >
                <span class="editor" v-html="item.content"></span>
                <span class="scoreNum">（{{ item.score }}分）</span>
              </p>
              <el-checkbox-group v-model="item.userAnswer">
                <el-checkbox
                  disabled
                  :label="ele.name"
                  v-for="ele in JSON.parse(item.optionsContent)"
                  :key="ele.name"
                  >{{ ele.name }}.<span
                    class="editor"
                    v-html="ele.content"
                  ></span
                ></el-checkbox>
              </el-checkbox-group>

              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="correctDialog ? 'color:#FFA900' : ''"
                      >纠错</span
                    >
                  </div>
                  <div class="collect" @click="myCollect">
                    <img
                      :src="
                        isCollect
                          ? require('@/assets/images/questionBank/collectActive.png')
                          : require('@/assets/images/questionBank/collect.png')
                      "
                      alt=""
                    />
                    <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                  </div>
                  <div class="sign" @click="mySign">
                    <img
                      :src="
                        isSign
                          ? require('@/assets/images/questionBank/signActive.png')
                          : require('@/assets/images/questionBank/sign.png')
                      "
                      alt=""
                    />
                    <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                  </div>
                </div>
                <div class="analysis-r" @click="watchAnalysis(item)">
                  <span>查看解析</span>
                  <img src="@/assets/images/questionBank/open.png" alt="" />
                </div>
                <div class="analysisContent" v-show="item.analysisShow">
                  <div
                    style="margin:10px 0"
                    v-show="item.userAnswer.length > 0"
                  >
                    <img
                      :src="
                        item.userAnswer.join('') ==
                        JSON.parse(item.answer).join('')
                          ? require('@/assets/images/questionBank/trueBig.png')
                          : require('@/assets/images/questionBank/errorBig.png')
                      "
                      alt=""
                    />
                  </div>
                  <div class="myAnswer">
                    <div class="myAnswer-l">我的答案：</div>
                    <div class="myAnswer-r">
                      {{
                        item.userAnswer.length == 0 ? "未作答" : item.userAnswer
                      }}
                    </div>
                  </div>
                  <div class="referenceAnswer">
                    <div class="referenceAnswer-l">参考答案：</div>
                    <div class="referenceAnswer-r">{{ item.answer }}</div>
                  </div>
                  <div class="answerResult">
                    <div class="answerResult-l">
                      <span>解</span>
                      <span style="margin-right: 6px;"> 析：</span>
                    </div>
                    <div class="answerResult-r">
                      {{ item.analysis }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 判断题 -->
          <div
            class="singleChoise"
            v-if="judgeList.length > 0"
            id="judge"
            style="margin-top:30px"
          >
            <div class="singleTitle">
              <div class="singleType">判断题</div>
              <!-- <div class="score">（共10题，共20分）</div> -->
            </div>
            <div
              class="ques"
              v-for="(item, index) in judgeList"
              :key="index"
              :id="'judge' + index"
            >
              <p>
                <span class="order"
                  >{{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      index +
                      1
                  }}.</span
                >
                {{ item.content }}
                <span class="scoreNum">（{{ item.score }}分）</span>
              </p>
              <el-radio-group v-model="item.userAnswer">
                <el-radio label="true" disabled>A. 正确</el-radio>
                <el-radio label="false" disabled>B. 错误</el-radio>
              </el-radio-group>

              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="correctDialog ? 'color:#FFA900' : ''"
                      >纠错</span
                    >
                  </div>
                  <div class="collect" @click="myCollect">
                    <img
                      :src="
                        isCollect
                          ? require('@/assets/images/questionBank/collectActive.png')
                          : require('@/assets/images/questionBank/collect.png')
                      "
                      alt=""
                    />
                    <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                  </div>
                  <div class="sign" @click="mySign">
                    <img
                      :src="
                        isSign
                          ? require('@/assets/images/questionBank/signActive.png')
                          : require('@/assets/images/questionBank/sign.png')
                      "
                      alt=""
                    />
                    <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                  </div>
                </div>
                <div class="analysis-r" @click="watchAnalysis(item)">
                  <span>查看解析</span>
                  <img src="@/assets/images/questionBank/open.png" alt="" />
                </div>
                <div class="analysisContent" v-if="item.analysisShow">
                  <div style="margin:10px 0" v-if="item.userAnswer != null">
                    <img
                      :src="
                        item.userAnswer == item.answer
                          ? require('@/assets/images/questionBank/trueBig.png')
                          : require('@/assets/images/questionBank/errorBig.png')
                      "
                      alt=""
                    />
                  </div>
                  <div class="myAnswer">
                    <div class="myAnswer-l">我的答案：</div>
                    <div class="myAnswer-r">
                      {{ item.userAnswer == null ? "未作答" : item.userAnswer }}
                    </div>
                  </div>
                  <div class="referenceAnswer">
                    <div class="referenceAnswer-l">参考答案：</div>
                    <div class="referenceAnswer-r">{{ item.answer }}</div>
                  </div>
                  <div class="answerResult">
                    <div class="answerResult-l">
                      <span>解</span>
                      <span style="margin-right: 6px;"> 析：</span>
                    </div>
                    <div class="answerResult-r">
                      {{ item.analysis }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 填空题 -->
          <div
            class="singleChoise"
            style="margin-top:30px"
            v-if="gapList.length > 0"
            id="tian"
          >
            <div class="singleTitle">
              <div class="singleType">填空题</div>
              <!-- <div class="score">（共5题，共20分）</div> -->
            </div>
            <div
              class="ques"
              v-for="(item, index) in gapList"
              :key="item.id"
              :id="'gap' + index"
            >
              <p>
                <span class="order"
                  >{{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      judgeList.length +
                      index +
                      1
                  }}.</span
                >
                {{ item.content }}
                <span style="color:#999999;font-size:14px"
                  >（{{ item.score }}分）</span
                >
              </p>
              <div
                style="display: flex;align-items: center;"
                v-for="(ele, index) in item.userAnswer"
                :key="index"
              >
                <span
                  style="min-width:70px;font-size: 16px;font-family: Microsoft YaHei;font-weight: 400;color: #999999;"
                  >第{{ index + 1 }}空：</span
                >
                <el-input
                  v-model="ele.content"
                  disabled
                  placeholder=""
                ></el-input>
              </div>

              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="correctDialog ? 'color:#FFA900' : ''"
                      >纠错</span
                    >
                  </div>
                  <div class="collect" @click="myCollect">
                    <img
                      :src="
                        isCollect
                          ? require('@/assets/images/questionBank/collectActive.png')
                          : require('@/assets/images/questionBank/collect.png')
                      "
                      alt=""
                    />
                    <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                  </div>
                  <div class="sign" @click="mySign">
                    <img
                      :src="
                        isSign
                          ? require('@/assets/images/questionBank/signActive.png')
                          : require('@/assets/images/questionBank/sign.png')
                      "
                      alt=""
                    />
                    <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                  </div>
                </div>
                <div class="analysis-r" @click="watchAnalysis(item)">
                  <span>查看解析</span>
                  <img src="@/assets/images/questionBank/open.png" alt="" />
                </div>
                <div class="analysisContent" v-if="item.analysisShow">
                  <div
                    style="margin:10px 0"
                    v-if="gapFun(item.userAnswer).join('') != ''"
                  >
                    <img
                      :src="
                        gapFun(item.userAnswer).join('') ==
                        JSON.parse(item.answer).join('')
                          ? require('@/assets/images/questionBank/trueBig.png')
                          : require('@/assets/images/questionBank/errorBig.png')
                      "
                      alt=""
                    />
                  </div>
                  <div class="myAnswer">
                    <div class="myAnswer-l">我的答案：</div>
                    <div class="myAnswer-r">
                      {{
                        gapFun(item.userAnswer).join("") == ""
                          ? "未作答"
                          : gapFun(item.userAnswer)
                      }}
                    </div>
                  </div>
                  <div class="referenceAnswer">
                    <div class="referenceAnswer-l">参考答案：</div>
                    <div class="referenceAnswer-r">{{ item.answer }}</div>
                  </div>
                  <div class="answerResult">
                    <div class="answerResult-l">
                      <span>解</span>
                      <span style="margin-right: 6px;"> 析：</span>
                    </div>
                    <div class="answerResult-r">
                      {{ item.analysis }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 问答题 -->
          <div
            class="singleChoise"
            style="margin-top:30px"
            v-if="essayList.length > 0"
            id="wen"
          >
            <div class="singleTitle">
              <div class="singleType">问答题</div>
              <!-- <div class="score">（共5题，共20分）</div> -->
            </div>
            <div
              class="ques"
              v-for="(item, index) in essayList"
              :key="item.id"
              :id="'essay' + index"
            >
              <p>
                <span class="order"
                  >{{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      judgeList.length +
                      gapList.length +
                      index +
                      1
                  }}.</span
                >
                {{ item.content
                }}<span style="font-size:14px;color:#999"
                  >（{{ item.score }}分）</span
                >
              </p>
              <div>
                <el-input
                  disabled
                  type="textarea"
                  :rows="4"
                  placeholder=""
                  v-model="item.userAnswer"
                >
                </el-input>
              </div>

              <div class="analysis">
                <div class="analysis-l">
                  <div class="jiucuo" @click="openCorrect(item)">
                    <img
                      :src="
                        correctDialog
                          ? require('@/assets/images/questionBank/jiucuoActive.png')
                          : require('@/assets/images/questionBank/jiucuo.png')
                      "
                      alt=""
                    />
                    <span :style="correctDialog ? 'color:#FFA900' : ''"
                      >纠错</span
                    >
                  </div>
                  <div class="collect" @click="myCollect">
                    <img
                      :src="
                        isCollect
                          ? require('@/assets/images/questionBank/collectActive.png')
                          : require('@/assets/images/questionBank/collect.png')
                      "
                      alt=""
                    />
                    <span :style="isCollect ? 'color:#17A5F2' : ''">收藏</span>
                  </div>
                  <div class="sign" @click="mySign">
                    <img
                      :src="
                        isSign
                          ? require('@/assets/images/questionBank/signActive.png')
                          : require('@/assets/images/questionBank/sign.png')
                      "
                      alt=""
                    />
                    <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                  </div>
                </div>
                <div class="analysis-r" @click="watchAnalysis(item)">
                  <span>查看解析</span>
                  <img src="@/assets/images/questionBank/open.png" alt="" />
                </div>
                <div class="analysisContent" v-if="item.analysisShow">
                  <div style="margin:10px 0" v-if="item.userAnswer != null">
                    <img
                      :src="
                        item.userAnswer == item.answer
                          ? require('@/assets/images/questionBank/trueBig.png')
                          : require('@/assets/images/questionBank/errorBig.png')
                      "
                      alt=""
                    />
                  </div>
                  <div class="myAnswer">
                    <div class="myAnswer-l">我的答案：</div>
                    <div class="myAnswer-r">
                      {{ item.userAnswer == null ? "未作答" : item.userAnswer }}
                    </div>
                  </div>
                  <div class="referenceAnswer">
                    <div class="referenceAnswer-l">参考答案：</div>
                    <div class="referenceAnswer-r">{{ item.answer }}</div>
                  </div>
                  <div class="answerResult">
                    <div class="answerResult-l">
                      <span>解</span>
                      <span style="margin-right: 6px;"> 析：</span>
                    </div>
                    <div class="answerResult-r">
                      {{ item.analysis }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 材料分析题 -->
          <div
            class="singleChoise"
            style="margin-top:30px"
            v-if="analysisList.length > 0"
            id="cai"
          >
            <div class="singleTitle">
              <div class="singleType">材料分析题</div>
              <!-- <div class="score">（共5题，共20分）</div> -->
            </div>
            <div
              class="ques"
              v-for="(el, index) in analysisList"
              :key="el.id"
              :id="'analysis' + index"
            >
              <p>
                <span class="order"
                  >{{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      judgeList.length +
                      gapList.length +
                      essayList.length +
                      index +
                      1
                  }}.</span
                >
                {{ el.content }}
              </p>
              <p
                style="font-size: 16px;font-family: Microsoft YaHei;font-weight: 400;color: #888888;"
              >
                请认真阅读上述材料，完成以下题目：
              </p>
              <div class="material">
                <!-- 单选题 -->
                <div
                  class="materialItem"
                  v-for="(item, index) in el.analysisSingleChoiceList"
                  :key="item.id"
                >
                  <div class="material-t">
                    <div class="materialTitle">单选题</div>
                    <span
                      >（{{ index + 1 }}）
                      <span class="editor" v-html="item.content"></span>
                    </span>
                    <span class="materialScore"> （{{ item.score }}分） </span>
                  </div>
                  <el-radio-group
                    style="margin-top:10px"
                    v-model="item.userAnswer"
                  >
                    <!-- class="error" 代表选择错误的选项 -->
                    <el-radio
                      disabled
                      :label="ele.name"
                      v-for="ele in JSON.parse(item.optionsContent)"
                      :key="ele.name"
                      >{{ ele.name }}.<span
                        class="editor"
                        v-html="ele.content"
                      ></span
                    ></el-radio>
                  </el-radio-group>

                  <div class="analysis">
                    <div class="analysis-l">
                      <div class="jiucuo" @click="openCorrect(item)">
                        <img
                          :src="
                            correctDialog
                              ? require('@/assets/images/questionBank/jiucuoActive.png')
                              : require('@/assets/images/questionBank/jiucuo.png')
                          "
                          alt=""
                        />
                        <span :style="correctDialog ? 'color:#FFA900' : ''"
                          >纠错</span
                        >
                      </div>
                      <div class="collect" @click="myCollect">
                        <img
                          :src="
                            isCollect
                              ? require('@/assets/images/questionBank/collectActive.png')
                              : require('@/assets/images/questionBank/collect.png')
                          "
                          alt=""
                        />
                        <span :style="isCollect ? 'color:#17A5F2' : ''"
                          >收藏</span
                        >
                      </div>
                      <div class="sign" @click="mySign">
                        <img
                          :src="
                            isSign
                              ? require('@/assets/images/questionBank/signActive.png')
                              : require('@/assets/images/questionBank/sign.png')
                          "
                          alt=""
                        />
                        <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                      </div>
                    </div>
                    <div class="analysis-r" @click="watchAnalysis(item)">
                      <span>查看解析</span>
                      <img src="@/assets/images/questionBank/open.png" alt="" />
                    </div>
                    <div class="analysisContent" v-if="item.analysisShow">
                      <div style="margin:10px 0" v-if="item.userAnswer">
                        <img
                          :src="
                            item.userAnswer == item.answer
                              ? require('@/assets/images/questionBank/trueBig.png')
                              : require('@/assets/images/questionBank/errorBig.png')
                          "
                          alt=""
                        />
                      </div>
                      <div class="myAnswer">
                        <div class="myAnswer-l">我的答案：</div>
                        <div class="myAnswer-r">
                          {{
                            item.userAnswer == null ? "未作答" : item.userAnswer
                          }}
                        </div>
                      </div>
                      <div class="referenceAnswer">
                        <div class="referenceAnswer-l">参考答案：</div>
                        <div class="referenceAnswer-r">{{ item.answer }}</div>
                      </div>
                      <div class="answerResult">
                        <div class="answerResult-l">
                          <span>解</span>
                          <span style="margin-right: 6px;"> 析：</span>
                        </div>
                        <div class="answerResult-r">
                          {{ item.analysis }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 多选题 -->
                <div
                  class="materialItem"
                  v-for="(item, index) in el.analysisMultipleChoiceList"
                  :key="item.id"
                >
                  <div class="material-t">
                    <div class="materialTitle">多选题</div>
                    <span
                      >（{{ el.analysisSingleChoiceList.length + index + 1 }}）
                      <span class="editor" v-html="item.content"></span>
                    </span>
                    <span class="materialScore"> （{{ item.score }}分） </span>
                  </div>
                  <el-checkbox-group v-model="item.userAnswer">
                    <el-checkbox
                      disabled
                      :label="ele.name"
                      v-for="ele in JSON.parse(item.optionsContent)"
                      :key="ele.name"
                      >{{ ele.name }}.<span
                        class="editor"
                        v-html="ele.content"
                      ></span
                    ></el-checkbox>
                  </el-checkbox-group>

                  <div class="analysis">
                    <div class="analysis-l">
                      <div class="jiucuo" @click="openCorrect(item)">
                        <img
                          :src="
                            correctDialog
                              ? require('@/assets/images/questionBank/jiucuoActive.png')
                              : require('@/assets/images/questionBank/jiucuo.png')
                          "
                          alt=""
                        />
                        <span :style="correctDialog ? 'color:#FFA900' : ''"
                          >纠错</span
                        >
                      </div>
                      <div class="collect" @click="myCollect">
                        <img
                          :src="
                            isCollect
                              ? require('@/assets/images/questionBank/collectActive.png')
                              : require('@/assets/images/questionBank/collect.png')
                          "
                          alt=""
                        />
                        <span :style="isCollect ? 'color:#17A5F2' : ''"
                          >收藏</span
                        >
                      </div>
                      <div class="sign" @click="mySign">
                        <img
                          :src="
                            isSign
                              ? require('@/assets/images/questionBank/signActive.png')
                              : require('@/assets/images/questionBank/sign.png')
                          "
                          alt=""
                        />
                        <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                      </div>
                    </div>
                    <div class="analysis-r" @click="watchAnalysis(item)">
                      <span>查看解析</span>
                      <img src="@/assets/images/questionBank/open.png" alt="" />
                    </div>
                    <div class="analysisContent" v-show="item.analysisShow">
                      <div
                        style="margin:10px 0"
                        v-show="item.userAnswer.length > 0"
                      >
                        <img
                          :src="
                            item.userAnswer.join('') ==
                            JSON.parse(item.answer).join('')
                              ? require('@/assets/images/questionBank/trueBig.png')
                              : require('@/assets/images/questionBank/errorBig.png')
                          "
                          alt=""
                        />
                      </div>
                      <div class="myAnswer">
                        <div class="myAnswer-l">我的答案：</div>
                        <div class="myAnswer-r">
                          {{
                            item.userAnswer.length == 0
                              ? "未作答"
                              : item.userAnswer
                          }}
                        </div>
                      </div>
                      <div class="referenceAnswer">
                        <div class="referenceAnswer-l">参考答案：</div>
                        <div class="referenceAnswer-r">{{ item.answer }}</div>
                      </div>
                      <div class="answerResult">
                        <div class="answerResult-l">
                          <span>解</span>
                          <span style="margin-right: 6px;"> 析：</span>
                        </div>
                        <div class="answerResult-r">
                          {{ item.analysis }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 判断题 -->
                <div
                  class="materialItem"
                  v-for="(item, index) in el.analysisJudgeList"
                  :key="item.id"
                >
                  <div class="material-t">
                    <div class="materialTitle">判断题</div>
                    <span
                      >（{{
                        el.analysisSingleChoiceList.length +
                          el.analysisMultipleChoiceList.length +
                          index +
                          1
                      }}）{{ item.content }}</span
                    >
                    <span class="materialScore"> （{{ item.score }}分） </span>
                  </div>
                  <el-radio-group
                    style="margin-top:10px"
                    v-model="item.userAnswer"
                    @change="singleChoice(item)"
                  >
                    <el-radio label="true">A. 正确</el-radio>
                    <el-radio label="false">B. 错误</el-radio>
                  </el-radio-group>

                  <div class="analysis">
                    <div class="analysis-l">
                      <div class="jiucuo" @click="openCorrect(item)">
                        <img
                          :src="
                            correctDialog
                              ? require('@/assets/images/questionBank/jiucuoActive.png')
                              : require('@/assets/images/questionBank/jiucuo.png')
                          "
                          alt=""
                        />
                        <span :style="correctDialog ? 'color:#FFA900' : ''"
                          >纠错</span
                        >
                      </div>
                      <div class="collect" @click="myCollect">
                        <img
                          :src="
                            isCollect
                              ? require('@/assets/images/questionBank/collectActive.png')
                              : require('@/assets/images/questionBank/collect.png')
                          "
                          alt=""
                        />
                        <span :style="isCollect ? 'color:#17A5F2' : ''"
                          >收藏</span
                        >
                      </div>
                      <div class="sign" @click="mySign">
                        <img
                          :src="
                            isSign
                              ? require('@/assets/images/questionBank/signActive.png')
                              : require('@/assets/images/questionBank/sign.png')
                          "
                          alt=""
                        />
                        <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                      </div>
                    </div>
                    <div class="analysis-r" @click="watchAnalysis(item)">
                      <span>查看解析</span>
                      <img src="@/assets/images/questionBank/open.png" alt="" />
                    </div>
                    <div class="analysisContent" v-if="item.analysisShow">
                      <div style="margin:10px 0" v-if="item.userAnswer != null">
                        <img
                          :src="
                            item.userAnswer == item.answer
                              ? require('@/assets/images/questionBank/trueBig.png')
                              : require('@/assets/images/questionBank/errorBig.png')
                          "
                          alt=""
                        />
                      </div>
                      <div class="myAnswer">
                        <div class="myAnswer-l">我的答案：</div>
                        <div class="myAnswer-r">
                          {{
                            item.userAnswer == null ? "未作答" : item.userAnswer
                          }}
                        </div>
                      </div>
                      <div class="referenceAnswer">
                        <div class="referenceAnswer-l">参考答案：</div>
                        <div class="referenceAnswer-r">{{ item.answer }}</div>
                      </div>
                      <div class="answerResult">
                        <div class="answerResult-l">
                          <span>解</span>
                          <span style="margin-right: 6px;"> 析：</span>
                        </div>
                        <div class="answerResult-r">
                          {{ item.analysis }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 填空题 -->
                <div
                  class="materialItem"
                  v-for="(item, index) in el.analysisGapList"
                  :key="item.id"
                >
                  <div class="material-t">
                    <div class="materialTitle">填空题</div>
                    <span
                      >（{{
                        el.analysisSingleChoiceList.length +
                          el.analysisMultipleChoiceList.length +
                          el.analysisJudgeList.length +
                          index +
                          1
                      }}）{{ item.content }}</span
                    >
                    <span class="materialScore"> （{{ item.score }}分） </span>
                  </div>
                  <div
                    style="display: flex;align-items: center;"
                    v-for="(ele, index) in item.userAnswer"
                    :key="index"
                  >
                    <span
                      style="min-width:70px;font-size: 16px;font-family: Microsoft YaHei;font-weight: 400;color: #999999;"
                      >第{{ index + 1 }}空：</span
                    >
                    <el-input
                      @change="changeGap(item)"
                      v-model="ele.content"
                      placeholder="请输入您的答案"
                    ></el-input>
                  </div>

                  <div class="analysis">
                    <div class="analysis-l">
                      <div class="jiucuo" @click="openCorrect(item)">
                        <img
                          :src="
                            correctDialog
                              ? require('@/assets/images/questionBank/jiucuoActive.png')
                              : require('@/assets/images/questionBank/jiucuo.png')
                          "
                          alt=""
                        />
                        <span :style="correctDialog ? 'color:#FFA900' : ''"
                          >纠错</span
                        >
                      </div>
                      <div class="collect" @click="myCollect">
                        <img
                          :src="
                            isCollect
                              ? require('@/assets/images/questionBank/collectActive.png')
                              : require('@/assets/images/questionBank/collect.png')
                          "
                          alt=""
                        />
                        <span :style="isCollect ? 'color:#17A5F2' : ''"
                          >收藏</span
                        >
                      </div>
                      <div class="sign" @click="mySign">
                        <img
                          :src="
                            isSign
                              ? require('@/assets/images/questionBank/signActive.png')
                              : require('@/assets/images/questionBank/sign.png')
                          "
                          alt=""
                        />
                        <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                      </div>
                    </div>
                    <div class="analysis-r" @click="watchAnalysis(item)">
                      <span>查看解析</span>
                      <img src="@/assets/images/questionBank/open.png" alt="" />
                    </div>
                    <div class="analysisContent" v-if="item.analysisShow">
                      <div
                        style="margin:10px 0"
                        v-if="gapFun(item.userAnswer).join('') != ''"
                      >
                        <img
                          :src="
                            gapFun(item.userAnswer).join('') ==
                            JSON.parse(item.answer).join('')
                              ? require('@/assets/images/questionBank/trueBig.png')
                              : require('@/assets/images/questionBank/errorBig.png')
                          "
                          alt=""
                        />
                      </div>
                      <div class="myAnswer">
                        <div class="myAnswer-l">我的答案：</div>
                        <div class="myAnswer-r">
                          {{
                            gapFun(item.userAnswer).join("") == ""
                              ? "未作答"
                              : gapFun(item.userAnswer)
                          }}
                        </div>
                      </div>
                      <div class="referenceAnswer">
                        <div class="referenceAnswer-l">参考答案：</div>
                        <div class="referenceAnswer-r">{{ item.answer }}</div>
                      </div>
                      <div class="answerResult">
                        <div class="answerResult-l">
                          <span>解</span>
                          <span style="margin-right: 6px;"> 析：</span>
                        </div>
                        <div class="answerResult-r">
                          {{ item.analysis }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 问答题 -->
                <div
                  class="materialItem"
                  v-for="(item, index) in el.analysisEssayList"
                  :key="item.id"
                >
                  <div class="material-t">
                    <div class="materialTitle">问答题</div>
                    <span
                      >（{{
                        el.analysisSingleChoiceList.length +
                          el.analysisMultipleChoiceList.length +
                          el.analysisJudgeList.length +
                          el.analysisGapList.length +
                          index +
                          1
                      }}）{{ item.content }}</span
                    >
                    <span class="materialScore"> （{{ item.score }}分） </span>
                  </div>

                  <el-input
                    @change="changeEssay(item)"
                    type="textarea"
                    :rows="4"
                    placeholder=""
                    v-model="item.userAnswer"
                  ></el-input>

                  <div class="analysis">
                    <div class="analysis-l">
                      <div class="jiucuo" @click="openCorrect(item)">
                        <img
                          :src="
                            correctDialog
                              ? require('@/assets/images/questionBank/jiucuoActive.png')
                              : require('@/assets/images/questionBank/jiucuo.png')
                          "
                          alt=""
                        />
                        <span :style="correctDialog ? 'color:#FFA900' : ''"
                          >纠错</span
                        >
                      </div>
                      <div class="collect" @click="myCollect">
                        <img
                          :src="
                            isCollect
                              ? require('@/assets/images/questionBank/collectActive.png')
                              : require('@/assets/images/questionBank/collect.png')
                          "
                          alt=""
                        />
                        <span :style="isCollect ? 'color:#17A5F2' : ''"
                          >收藏</span
                        >
                      </div>
                      <div class="sign" @click="mySign">
                        <img
                          :src="
                            isSign
                              ? require('@/assets/images/questionBank/signActive.png')
                              : require('@/assets/images/questionBank/sign.png')
                          "
                          alt=""
                        />
                        <span :style="isSign ? 'color:#E82020' : ''">标记</span>
                      </div>
                    </div>
                    <div class="analysis-r" @click="watchAnalysis(item)">
                      <span>查看解析</span>
                      <img src="@/assets/images/questionBank/open.png" alt="" />
                    </div>
                    <div class="analysisContent" v-if="item.analysisShow">
                      <div style="margin:10px 0" v-if="item.userAnswer != null">
                        <img
                          :src="
                            item.userAnswer == item.answer
                              ? require('@/assets/images/questionBank/trueBig.png')
                              : require('@/assets/images/questionBank/errorBig.png')
                          "
                          alt=""
                        />
                      </div>
                      <div class="myAnswer">
                        <div class="myAnswer-l">我的答案：</div>
                        <div class="myAnswer-r">
                          {{
                            item.userAnswer == null ? "未作答" : item.userAnswer
                          }}
                        </div>
                      </div>
                      <div class="referenceAnswer">
                        <div class="referenceAnswer-l">参考答案：</div>
                        <div class="referenceAnswer-r">{{ item.answer }}</div>
                      </div>
                      <div class="answerResult">
                        <div class="answerResult-l">
                          <span>解</span>
                          <span style="margin-right: 6px;"> 析：</span>
                        </div>
                        <div class="answerResult-r">
                          {{ item.analysis }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="examContent-r">
        <div class="countDown">
          <div class="back" @click="$router.push({ name: 'QuestionBank' })">
            返回
          </div>
          <div class="reTest" @click="reTest">再考一次</div>
        </div>

        <!-- 答题卡 -->
        <div class="answerSheet">
          <p class="title">答题卡</p>
          <div class="typeQues" v-if="singleChoiceList.length > 0">
            <div>单选题</div>
            <ul>
              <li v-for="(item, index) in singleChoiceList" :key="index">
                <a
                  :class="
                    item.userAnswer
                      ? item.userAnswer == item.answer
                        ? 'true'
                        : 'error'
                      : ''
                  "
                  :href="'#single' + index"
                >
                  {{ index + 1 }}</a
                >
              </li>
            </ul>
          </div>

          <div class="typeQues" v-show="multipleChoiceList.length > 0">
            <div>多选题</div>
            <ul>
              <li v-for="(item, index) in multipleChoiceList" :key="index">
                <a
                  :class="
                    item.userAnswer.length > 0
                      ? item.userAnswer.join('') ==
                        JSON.parse(item.answer).join('')
                        ? 'true'
                        : 'error'
                      : ''
                  "
                  :href="'#multiple' + index"
                >
                  {{ singleChoiceList.length + index + 1 }}</a
                >
              </li>
            </ul>
          </div>

          <div class="typeQues" v-show="judgeList.length > 0">
            <div>判断题</div>
            <ul>
              <li v-for="(item, index) in judgeList" :key="index">
                <a
                  :class="
                    item.userAnswer
                      ? item.userAnswer == item.answer
                        ? 'true'
                        : 'error'
                      : ''
                  "
                  :href="'#judge' + index"
                >
                  {{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      undefinedChoiceList.length +
                      index +
                      1
                  }}</a
                >
              </li>
            </ul>
          </div>

          <div class="typeQues" v-show="gapList.length > 0">
            <div>填空题</div>
            <ul>
              <li v-for="(item, index) in gapList" :key="index">
                <a
                  :class="
                    gapFun(item.userAnswer).join('') != ''
                      ? gapFun(item.userAnswer).join('') ==
                        JSON.parse(item.answer).join('')
                        ? 'true'
                        : 'error'
                      : ''
                  "
                  :href="'#gap' + index"
                >
                  {{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      undefinedChoiceList.length +
                      judgeList.length +
                      index +
                      1
                  }}</a
                >
              </li>
            </ul>
          </div>

          <div class="typeQues" v-show="essayList.length > 0">
            <div>问答题</div>
            <ul>
              <li v-for="(item, index) in essayList" :key="index">
                <a
                  :class="
                    item.userAnswer
                      ? item.userAnswer == item.answer
                        ? 'true'
                        : 'error'
                      : ''
                  "
                  :href="'#essay' + index"
                >
                  {{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      undefinedChoiceList.length +
                      judgeList.length +
                      gapList.length +
                      index +
                      1
                  }}</a
                >
              </li>
            </ul>
          </div>

          <div class="typeQues" v-show="analysisList.length > 0">
            <div>材料分析题</div>
            <ul>
              <li v-for="(item, index) in analysisList" :key="index">
                <a
                  v-if="item.childrenList.length > 0"
                  :class="
                    item.userAnswer == true
                      ? item.childrenList[0].userAnswer ==
                        item.childrenList[0].answer
                        ? 'true'
                        : 'error'
                      : ''
                  "
                  :href="'#analysis' + index"
                >
                  {{
                    singleChoiceList.length +
                      multipleChoiceList.length +
                      undefinedChoiceList.length +
                      judgeList.length +
                      gapList.length +
                      essayList.length +
                      index +
                      1
                  }}</a
                >
              </li>
            </ul>
          </div>

          <div class="bottom">
            <div class="tips">
              <div class="tipone">
                <div
                  style="width: 16px;height: 16px;background: #5FCC16;border-radius: 4px;"
                ></div>
                <span>正确</span>
              </div>
              <div class="tipone">
                <div
                  style="width: 16px;height: 16px;background:#E82020;border-radius: 4px;"
                ></div>
                <span>错误</span>
              </div>
              <div class="tipone">
                <div
                  style="width: 14px;height: 14px;border: 1px solid #C4C4C4;border-radius: 4px;"
                ></div>
                <span>未做</span>
              </div>
              <div class="tipone">
                <div
                  style="width: 14px;height: 14px;border: 1px solid #E82020;border-radius: 4px;"
                ></div>
                <span>标记</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 纠错弹窗 -->
    <el-dialog
      class="saveDia"
      width="480px"
      title="错题反馈"
      :visible.sync="correctDialog"
      @close="closeDialog"
    >
      <div class="correctBox">
        <p>您的意见对我们很宝贵</p>
        <div class="correctType">
          <p class="label">纠错类型：</p>
          <ul>
            <li
              @click="correct(0)"
              :class="correctTypeIndex == 0 ? 'active' : ''"
            >
              题干或解析错误
            </li>
            <li
              @click="correct(1)"
              :class="correctTypeIndex == 1 ? 'active' : ''"
            >
              解析不匹配
            </li>
            <li
              @click="correct(2)"
              :class="correctTypeIndex == 2 ? 'active' : ''"
            >
              答案错误
            </li>
            <li
              @click="correct(3)"
              :class="correctTypeIndex == 3 ? 'active' : ''"
            >
              其它
            </li>
          </ul>
        </div>

        <div class="correctType">
          <p class="label">我要补充：</p>
          <el-input
            style="margin-top:12px"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder=""
            v-model="extra"
          >
          </el-input>
          <div class="btns">
            <div class="cancel" @click="cancel">取消</div>
            <div class="confirm" @click="confirm">确认</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { examResult, correction } from "@/api/questionBank/questionBank.js";
export default {
  name: "Exam",
  data() {
    return {
      questionLists: [
        "单选题",
        "多选题",
        "判断题",
        "填空题",
        "问答题",
        "材料分析题"
      ],
      questionIndex: null,
      form: {
        radio1: 1, //单选
        checkList1: [], //多选
        input1: "",
        input2: "", //填空
        textarea1: "",
        textarea2: "", //问答
        judge1: false, //判断题
        materialRadio1: "", //材料分析题单选
        materialCheckList1: [] //材料分析题多选
      },
      correctDialog: false, //纠错弹窗
      correctTypeIndex: 0,
      extra: "",
      isCollect: false, //是否收藏
      isSign: false, //是否标记
      tableData: [
        {
          id: "答错",
          name1: "",
          name2: "",
          score: "",
          time: ""
        },
        {
          id: "答对",
          name1: "",
          name2: "",
          name4: "",
          name5: ""
        },
        {
          id: "未答"
        },
        {
          id: "得分"
        },
        {
          id: ""
        }
      ],
      singleChoiceList: [], // 单选题目
      multipleChoiceList: [],
      undefinedChoiceList: [],
      judgeList: [],
      gapList: [],
      essayList: [],
      analysisList: [],
      examInfo: {}, //试卷标题等
      examList: [],
      examPaperId: "" //试卷id
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      examResult({
        examResultId: this.$route.query.examResultId
      }).then(res => {
        console.log(res, "考试结果");
        this.examInfo = res.data.examPaperVO; //试卷详情
        this.examList = res.data.listExamAnswerCountVO; // 表格
        this.examPaperId = res.data.examResultVO.examPaperId;
        // 表格数据做处理
        this.examList.forEach(ele => {
          if (ele.typeId == 1) {
            this.tableData[0].name1 = ele.wrongAmount + "道";
            this.tableData[1].name1 = ele.rightAmount + "道";
            this.tableData[2].name1 = ele.missAmount + "道";
            this.tableData[3].name1 = ele.score + "分";
            this.tableData[4].id = "正确率 " + res.data.rightRate;
          } else if (ele.typeId == 2) {
            this.tableData[0].name2 = ele.wrongAmount + "道";
            this.tableData[1].name2 = ele.rightAmount + "道";
            this.tableData[2].name2 = ele.missAmount + "道";
            this.tableData[3].name2 = ele.score + "分";
          } else if (ele.typeId == 4) {
            this.tableData[0].name3 = ele.wrongAmount + "道";
            this.tableData[1].name3 = ele.rightAmount + "道";
            this.tableData[2].name3 = ele.missAmount + "道";
            this.tableData[3].name3 = ele.score + "分";
          } else if (ele.typeId == 5) {
            this.tableData[0].name4 = ele.wrongAmount + "道";
            this.tableData[1].name4 = ele.rightAmount + "道";
            this.tableData[2].name4 = ele.missAmount + "道";
            this.tableData[3].name4 = ele.score + "分";
          } else if (ele.typeId == 6) {
            this.tableData[0].name5 = ele.wrongAmount + "道";
            this.tableData[1].name5 = ele.rightAmount + "道";
            this.tableData[2].name5 = ele.missAmount + "道";
            this.tableData[3].name5 = ele.score + "分";
          } else if (ele.typeId == 7) {
            this.tableData[0].name6 = ele.wrongAmount + "道";
            this.tableData[1].name6 = ele.rightAmount + "道";
            this.tableData[2].name6 = ele.missAmount + "道";
            this.tableData[3].name6 = ele.score + "分";
          } else if (ele.typeId == 8) {
            this.tableData[0].name7 = ele.wrongAmount + "道";
            this.tableData[1].name7 = ele.rightAmount + "道";
            this.tableData[2].name7 = ele.missAmount + "道";
            this.tableData[3].name7 = ele.score + "分";
            this.tableData[0].score = ele.score + "分";
            this.tableData[0].time =
              "答题用时 " + res.data.examResultVO.answerTime + "分钟";
          }
        });
        res.data.questionList.forEach(ele => {
          ele.analysisShow = true;
          if (ele.typeId == 1) {
            this.singleChoiceList.push(ele);
          } else if (ele.typeId == 2) {
            this.multipleChoiceList.push(ele);
          } else if (ele.typeId == 3) {
            this.undefinedChoiceList.push(ele);
          } else if (ele.typeId == 4) {
            this.judgeList.push(ele);
          } else if (ele.typeId == 5) {
            this.gapList.push(ele);
          } else if (ele.typeId == 6) {
            this.essayList.push(ele);
          } else {
            this.analysisList.push(ele);
          }
        });

        // 多选题数据做处理
        this.multipleChoiceList.forEach(item => {
          try {
            if (!item.userAnswer) {
              item.userAnswer = [];
            } else {
              item.userAnswer = JSON.parse(item.userAnswer);
            }
          } catch (e) {
            item.userAnswer = [];
          }
        });

        // 填空题数据做处理
        this.gapList.forEach(item => {
          try {
            if (!item.userAnswer) {
              item.userAnswer = [];
              if (item.answer != "") {
                console.log(JSON.parse(item.answer));
                JSON.parse(item.answer).forEach(ele => {
                  item.userAnswer.push({ content: "" });
                });
              }
            } else {
              item.userAnswer = JSON.parse(item.userAnswer);
              var userAnswer = this._.cloneDeep(item.userAnswer); //深克隆一下原数组用于循环
              item.userAnswer = [];
              userAnswer.forEach(ele => {
                item.userAnswer.push({ content: ele });
              });
            }
          } catch (e) {
            item.userAnswer = [];
            if (item.answer != "") {
              console.log(JSON.parse(item.answer));
              JSON.parse(item.answer).forEach(ele => {
                item.userAnswer.push({ content: "" });
              });
            }
          }
        });

        // 材料分析题子题
        this.analysisList.forEach(item => {
          // 练习的材料分析题存在问题
          item.analysisSingleChoiceList = [];
          item.analysisMultipleChoiceList = [];
          item.analysisUndefinedChoiceList = [];
          item.analysisJudgeList = [];
          item.analysisGapList = [];
          item.analysisEssayList = [];
          if (item.childrenList.length > 0) {
            item.childrenList.forEach(ele => {
              this.$set(ele, "analysisShow", true);
              // ele.analysisShow = true;
              if (ele.typeId == 1) {
                // 刷新页面材料分析题的userAnswer就消失了
                // 回显材料分析题答题卡
                if (ele.userAnswer != null) {
                  item.userAnswer = true;
                }
                item.analysisSingleChoiceList.push(ele);
              } else if (ele.typeId == 2) {
                item.analysisMultipleChoiceList.push(ele);

                // 材料分析题下多选题数据做处理
                item.analysisMultipleChoiceList.forEach(tem => {
                  try {
                    if (!tem.userAnswer) {
                      tem.userAnswer = [];
                    } else {
                      tem.userAnswer = JSON.parse(tem.userAnswer);
                    }
                  } catch (e) {
                    tem.userAnswer = [];
                  }
                });
                // 回显材料分析题
                if (ele.userAnswer.length > 0) {
                  item.userAnswer = true;
                }
              } else if (ele.typeId == 3) {
                item.analysisUndefinedChoiceList.push(ele);
              } else if (ele.typeId == 4) {
                item.analysisJudgeList.push(ele);
                // 回显材料分析题答题卡
                if (ele.userAnswer != null) {
                  item.userAnswer = true;
                }
              } else if (ele.typeId == 5) {
                item.analysisGapList.push(ele);

                // 材料分析题下填空题数据做处理
                item.analysisGapList.forEach(tem => {
                  try {
                    if (!tem.userAnswer) {
                      tem.userAnswer = [];
                      if (tem.answer != "") {
                        console.log(JSON.parse(tem.answer));
                        JSON.parse(tem.answer).forEach(ele => {
                          tem.userAnswer.push({ content: "" });
                        });
                      }
                    } else {
                      tem.userAnswer = JSON.parse(tem.userAnswer);
                      var userAnswer = this._.cloneDeep(tem.userAnswer); //深克隆一下原数组用于循环
                      tem.userAnswer = [];
                      userAnswer.forEach(ele => {
                        tem.userAnswer.push({ content: ele });
                      });
                    }
                  } catch (e) {
                    tem.userAnswer = [];
                    if (tem.answer != "") {
                      console.log(JSON.parse(tem.answer));
                      JSON.parse(tem.answer).forEach(ele => {
                        tem.userAnswer.push({ content: "" });
                      });
                    }
                  }
                });
              } else if (ele.typeId == 6) {
                item.analysisEssayList.push(ele);
              }
            });
          }
        });
      });
    },

    // 填空题填的答案判断是否与标准答案相等
    gapFun(item) {
      var arr = [];
      item.forEach(ele => {
        arr.push(ele.content);
      });
      return arr;
    },
    // 查看解析
    watchAnalysis(item) {
      if (!item.analysisShow) {
        // item.analysisShow = true;
        this.$set(item, "analysisShow", true);
      } else {
        // item.analysisShow = false;
        this.$set(item, "analysisShow", false);
      }
    },
    // 重考
    reTest() {
      this.$router.push({
        name: "Exam",
        query: {
          id: this.examPaperId,
          name: this.$route.query.name,
          title: this.examInfo.title,
          type: this.$route.query.type
        }
      });
    },
    // 表格跨行跨列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 4 && columnIndex === 0) {
        return [1, 9];
      }
      if (rowIndex === 0 && columnIndex === 8) {
        return [4, 1];
      }
    },
    currentIndex(index) {
      this.questionIndex = index;
    },
    // 打开纠错弹窗
    openCorrect(item) {
      this.correctDialog = true;
      this.confirmId = item.id;
      this.confirmQuestionType = item.questionType;
      this.confirmLessonId = item.lessonId;
      this.confirmChapterId = item.chapterId;
      this.confirmCourseId = item.courseId;
    },
    correct(index) {
      this.correctTypeIndex = index;
    },
    cancel() {
      this.correctDialog = false;
    },
    // 关闭纠错弹窗的回调
    closeDialog() {
      this.correctTypeIndex = 0;
      this.extra = "";
    },
    confirm() {
      correction({
        questionId: this.confirmId,
        questionType: this.confirmQuestionType,
        type: this.correctTypeIndex,
        title: this.extra,
        lessonId: this.confirmLessonId,
        chapterId: this.confirmChapterId,
        courseId: this.confirmCourseId
      }).then(res => {
        if (res.code === 0 && res.data) {
          this.$message({
            message: "纠错成功",
            type: "success"
          });
          this.correctDialog = false;
        }
      });
    },
    // 收藏
    myCollect() {
      if (this.isCollect) {
        this.isCollect = false;
      } else {
        this.isCollect = true;
      }
    },
    // 标记
    mySign() {
      if (this.isSign) {
        this.isSign = false;
      } else {
        this.isSign = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.exam {
  width: 1200px;
  margin: 0 auto;
  // 纠错弹窗
  .saveDia {
    /deep/ .el-dialog__header {
      text-align: center;
      .el-dialog__title {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
    }
    // 交卷
    .handExamBox {
      p {
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #888888;
        span {
          color: #e82020;
        }
      }
      .btns {
        margin-top: 50px;
        display: flex;
        padding: 0 25px;
        justify-content: space-between;
        .cancel {
          width: 180px;
          height: 45px;
          background: #f5f5f5;
          border-radius: 4px;
          text-align: center;
          line-height: 45px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          &:hover {
            cursor: pointer;
          }
        }
        .submit {
          width: 180px;
          height: 45px;
          background: #17a5f2;
          border-radius: 4px;
          text-align: center;
          line-height: 45px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    // 纠错
    .correctBox {
      padding: 0 30px;
      p {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        margin-top: -30px;
        text-align: center;
      }
      .correctType {
        margin-top: 50px;
        .label {
          text-align: left;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #888888;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 42px;
            text-align: center;
            line-height: 42px;
            background: #f5f5f5;
            border-radius: 4px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #888888;
            padding: 0px 15px;
            margin-right: 10px;
            margin-top: 10px;
            &:hover {
              cursor: pointer;
            }
            &.active {
              color: #ffffff;
              background: #17a5f2;
            }
          }
        }
        /deep/ .el-textarea__inner {
          background-color: #f5f5f5;
        }
        .btns {
          height: 45px;
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          .cancel {
            width: 180px;
            height: 45px;
            background: #eeeeee;
            border-radius: 4px;
            line-height: 45px;
            text-align: center;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            &:hover {
              cursor: pointer;
            }
          }
          .confirm {
            width: 180px;
            height: 45px;
            background: #17a5f2;
            border-radius: 4px;
            line-height: 45px;
            text-align: center;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  // 填空题样式
  /deep/ .el-input__inner {
    border: none;
    border-bottom: 1px solid #dcdfe6;
    border-radius: 0px;
  }
  // 多选样式
  .el-checkbox {
    white-space: pre-wrap; //强制换行
    min-height: 30px;
    line-height: 30px;
    display: block;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }
  /deep/ .el-checkbox__label {
    display: inline;
  }
  // 单选样式
  .el-radio {
    white-space: pre-wrap; //强制换行
    min-height: 30px;
    line-height: 30px;
    display: block;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }
  /deep/ .el-radio__inner {
    width: 20px;
    height: 20px;
  }
  .el-radio-button__inner,
  .el-radio-group {
    display: block;
  }
  .Breadcrumb {
    height: 20px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    img {
      margin-right: 8px;
    }
    span {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #888888;
    }
  }
  .examContent {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    .examContent-l {
      width: 896px;
      .info {
        width: 856px;
        background: #ffffff;
        border-radius: 4px;
        padding: 20px;
        .p1 {
          margin-top: 10px;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          text-align: center;
        }
        .p2 {
          margin-top: 16px;
          text-align: center;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          span {
            margin-left: 30px;
          }
        }
      }
      .questionType {
        margin-top: 10px;
        height: 60px;
        width: 866px;
        background: #ffffff;
        border-radius: 4px;
        padding-left: 30px;
        ul {
          display: flex;
          align-items: center;
          height: 60px;
          li {
            width: 108px;
            height: 32px;
            background: #eeeeee;
            border-radius: 4px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #666666;
            text-align: center;
            line-height: 32px;
            margin-right: 14px;
            a {
              display: inline-block;
              width: 108px;
              height: 32px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #666666;
              text-align: center;
              background: #eeeeee;
              border-radius: 4px;
              &.active {
                color: #ffffff;
                background: #17a5f2;
              }
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
      .question-c {
        margin-top: 10px;
        padding: 30px;
        width: 836px;
        border-radius: 4px;
        background: #ffffff;
        .singleChoise {
          .singleTitle {
            display: flex;
            height: 36px;
            display: flex;
            align-items: center;
            .singleType {
              background: #17a5f2;
              border-radius: 4px;
              padding: 8px 12px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
            }
            .score {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #999999;
              margin-left: 15px;
            }
          }
          .ques {
            p {
              margin: 20px 0;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #333333;
              .order {
                font-weight: bold;
                font-size: 18px;
              }
              .scoreNum {
                color: #999;
                font-size: 14px;
              }
            }
            .analysis {
              margin-top: 10px;
              min-height: 45px;
              background: #f6f6f6;
              border-radius: 4px;
              padding: 0 20px;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              .analysisContent {
                padding: 5px 0 30px;
                width: 100%;
                border-top: 1px solid #e4e4e4;
                .myAnswer {
                  display: flex;
                  align-items: center;
                  height: 30px;
                  font-size: 16px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #999999;
                  .myAnswer-l {
                    width: 86px;
                  }
                }
                .referenceAnswer {
                  display: flex;
                  align-items: center;
                  height: 30px;
                  font-size: 16px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #999999;
                  .referenceAnswer-l {
                    width: 86px;
                  }
                }
                .answerResult {
                  display: flex;
                  font-size: 16px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #999999;
                  .answerResult-l {
                    min-width: 86px;
                    display: flex;
                    justify-content: space-between;
                  }
                }
              }
              .analysis-r {
                height: 45px;
                display: flex;
                align-items: center;
                &:hover {
                  cursor: pointer;
                }
                span {
                  margin-right: 10px;
                  font-size: 16px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #17a5f2;
                }
              }
              .analysis-l {
                height: 45px;
                display: flex;
                .jiucuo {
                  height: 45px;
                  display: flex;
                  align-items: center;
                  &:hover {
                    cursor: pointer;
                  }
                  span {
                    margin-left: 8px;
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #888888;
                  }
                }
                .collect {
                  margin-left: 20px;
                  height: 45px;
                  display: flex;
                  align-items: center;
                  &:hover {
                    cursor: pointer;
                  }
                  span {
                    margin-left: 8px;
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #888888;
                  }
                }
                .sign {
                  margin-left: 20px;
                  height: 45px;
                  display: flex;
                  align-items: center;
                  &:hover {
                    cursor: pointer;
                  }
                  span {
                    margin-left: 8px;
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #888888;
                  }
                }
              }
            }
            // 材料分析题
            .material {
              .materialItem {
                margin-top: 10px;
                .material-t {
                  display: flex;
                  align-items: center;
                  .materialTitle {
                    padding: 8px 7px;
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #17a5f2;
                    background: #ffffff;
                    border: 1px solid #17a5f2;
                    border-radius: 4px;
                  }
                  span {
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #333333;
                    &.materialScore {
                      font-size: 14px;
                      color: #999;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .examContent-r {
      width: 288px;
      height: 1050px; //不能比父元素高
      position: sticky; //粘性定位
      top: 0px; //距离顶部为0px fixed定位
      .countDown {
        width: 240px;
        height: 120px;
        background: #ffffff;
        border-radius: 4px;
        padding: 24px;
        .back {
          margin-top: 10px;
          width: 240px;
          height: 46px;
          background: #17a5f2;
          border-radius: 4px;
          text-align: center;
          line-height: 46px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          &:hover {
            cursor: pointer;
          }
        }
        .reTest {
          margin-top: 16px;
          width: 240px;
          height: 46px;
          border: 1px solid #17a5f2;
          border-radius: 4px;
          text-align: center;
          line-height: 46px;
          box-sizing: border-box;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #17a5f2;
          &:hover {
            cursor: pointer;
          }
        }
      }
      // 答题卡
      .answerSheet {
        // height: 800px;
        width: 240px;
        margin-top: 10px;
        background: #ffffff;
        border-radius: 4px;
        padding: 0 24px;
        .title {
          height: 58px;
          border-bottom: 1px solid #f5f5f5;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          span {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #e82020;
            margin-left: 13px;
          }
        }
        .typeQues {
          div {
            margin: 20px 0;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #888888;
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              width: 34px;
              height: 26px;
              background: #ffffff;
              border: 1px solid #c4c4c4;
              border-radius: 4px;
              text-align: center;
              line-height: 28px;
              font-size: 16px;
              font-family: Arial;
              font-weight: 400;
              color: #333333;
              margin-right: 7px;
              margin-bottom: 7px;
              a {
                width: 100%;
                height: 100%;
                display: block;
                color: #333333;
                &.true {
                  width: 100%;
                  height: 100%;
                  color: #fff;
                  background: #5fcc16;
                  border-radius: 4px;
                  border: none;
                }
                &.error {
                  width: 100%;
                  height: 100%;
                  color: #fff;
                  background: #e82020;
                  border-radius: 4px;
                  border: none;
                }
              }
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        .bottom {
          margin-top: 20px;
          height: 102px;
          border-top: 1px solid #f5f5f5;
          .tips {
            margin-top: 20px;
            height: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            .tipone {
              height: 20px;
              display: flex;
              align-items: center;
              span {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #333333;
                margin-left: 9px;
              }
            }
          }
          .saveProgress {
            margin-top: 20px;
            width: 240px;
            height: 46px;
            background: #17a5f2;
            border-radius: 4px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            text-align: center;
            line-height: 46px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
