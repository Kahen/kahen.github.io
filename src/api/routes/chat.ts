import _ from 'lodash';

import Request from '@/lib/request/Request.ts';
import Response from '@/lib/response/Response.ts';
import chat from '@/api/controllers/chat.ts';

export default {

    prefix: '/v1/chat',

    post: {

        '/completions': async (request: Request) => {
            request
                .validate('body.conversation_id', v => _.isUndefined(v) || _.isString(v))
                .validate('body.messages', _.isArray)
                .validate('headers.authorization', _.isString)
            // refresh_token切分
            const tokens = chat.tokenSplit(request.headers.authorization);
            // 随机挑选一个refresh_token
            const token = _.sample(tokens);
            const { model, conversation_id: convId, messages, stream, use_search } = request.body;
            if (stream) {
                const stream = await chat.createCompletionStream(model, messages, token, use_search, convId);
                return new Response(stream, {
                    type: "text/event-stream"
                });
            }
            else
                return await chat.createCompletion(model, messages, token, use_search, convId);
        },


        '/schedule': async (request: Request) => {
            request
                .validate('body.conversation_id', v => _.isUndefined(v) || _.isString(v))
                .validate('body.messages', _.isArray)
                .validate('headers.authorization', _.isString)
            let rep = '';

            // refresh_token切分
            const tokens = chat.tokenSplit(request.headers.authorization);
            // 随机挑选一个refresh_token
            const token = _.sample(tokens);
            const {model, conversation_id: convId, messages, stream, use_search} = request.body;
            const response_text = await chat.createCompletion(model, messages, token, use_search, convId);
            if (response_text['choices'][0]['message'].content.length > 200) rep += response_text['choices'][0]['message'].content;
            messages.push(
                response_text['choices'][0]['message']
            )
            messages.push({
                "role": "user",
                "content": "如果翻译没有结束请继续,结束了请回复OK"
            })
            const response_text2 = await chat.createCompletion(model, messages, token, use_search, convId);
            if (response_text2['choices'][0]['message'].content !== "OK" && response_text2['choices'][0]['message'].content.length > 200) {
                rep += response_text2['choices'][0]['message'].content;
            }
            return rep;
        }

    }

}
