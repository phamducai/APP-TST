import { DECREMENT, INCREMENT } from '../actions/actionTypes';

//state không thay đổi, chỉ trả về giá trị cuối cùng
const counterReducers = (times = 0, action) => {
    switch (action.type) {
        case INCREMENT:
            return times + action.step;
        case DECREMENT:
            return times - action.step;

        default:
            return times;
    }
}

export default counterReducers;