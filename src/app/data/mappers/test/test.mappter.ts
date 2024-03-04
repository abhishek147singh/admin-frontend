import { Injectable } from "@angular/core";
import { PassageModel, TestModel } from "../../../core/domain/test/test.model";
import { CreateTestModel } from "../../../core/domain/test/createTest.model";
import { TestLevel } from "../../../core/enumes/TestLevel.enum";
import { TestByIdModel } from "../../../core/domain/test/getTestById.model";

@Injectable({
    'providedIn':'root'
})

export class TestMapper{


    TestToCreateTest(testModel:TestModel, testName:string, level:TestLevel):CreateTestModel{

        const passages = testModel.Passages.map(passage => {

            const questions = passage.Questions.map(question => {
                return {
                    summary: question.Summary,
                    ques: question.Ques,
                    optA: question.OptA,
                    optB: question.OptB,
                    optC: question.OptC,
                    optD: question.OptD,
                    optE: question.OptE,
                    optRight: question.OptRight,
                    explaniation: question.Explaniation,
                    chapterId: question.ChapterId,
                    level: question.Level,
                }
            });

            return {
                id:passage._id,
                passage: passage.Passage,
                questions: questions,
                pssageReadingTime: passage.PassageReadTime,
                questionAttempTime: passage.QuestionAttemptTime
            }
        });


        const vocabQuestions = testModel.VocabQuestions.map(question => {
            return {
                summary: question.Summary,
                ques: question.Ques,
                optA: question.OptA,
                optB: question.OptB,
                optC: question.OptC,
                optD: question.OptD,
                optE: question.OptE,
                optRight: question.OptRight,
                explaniation: question.Explaniation,
                chapterId: question.ChapterId,
                level: question.Level,
            }
        }); 

        return {
            name: testName,
            level: level,
            passages: passages,
            vocabQuestions: vocabQuestions,
        };
    }

    getTestByIdToTestModel(testModel:TestByIdModel):TestModel{
        const passages:PassageModel[] = testModel.passages.map(passage => {

            const questions = passage.questions.map(question => {
                return {
                    _id:question.id,
                    Summary: question.summary,
                    Ques: question.ques,
                    OptA: question.optA,
                    OptB: question.optB,
                    OptC: question.optC,
                    OptD: question.optD,
                    OptE: question.optE,
                    OptRight: question.optRight,
                    Explaniation: question.explaniation,
                    ChapterId: question.chapterId,
                    Level: question.level,
                }
            });

            return {
                PssageReadingTime: passage.pssageReadingTime,
                QuestionAttempTime: passage.questionAttempTime,
                _id: passage.id,
                Passage: passage.passage,
                Summary: '',
                NoOfQuestions: questions.length,
                PassageReadTime: 0,
                QuestionAttemptTime:0,
                Questions:questions
            }
        });


        const vocabQuestions = testModel.vocabQuestions.map(question => {
            return {
                _id:question.id,
                Summary: question.summary,
                Ques: question.ques,
                OptA: question.optA,
                OptB: question.optB,
                OptC: question.optC,
                OptD: question.optD,
                OptE: question.optE,
                OptRight: question.optRight,
                Explaniation: question.explaniation,
                ChapterId: question.chapterId,
                Level: question.level,
            }
        }); 

        return {
            _id: testModel.id,
            Name: testModel.name,
            IsFree: testModel.isFree,
            IsLaunched: testModel.isLaunched,
            TimeInMinutes: 0,
            IsComingSoon: testModel.isComingSoon,
            Level: testModel.level,
            IsHighlight: testModel.isHighlight,
            PositiveMarks: 0,
            NegativeMarks: 0,
            Passages: passages,
            VocabQuestions: vocabQuestions
        };
    }
}