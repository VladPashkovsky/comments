import styles from './style.module.css'
import { useState} from 'react'
import useStore, {Todo} from '../components/QuestionForm/store.ts'
import axios from 'axios'
// @ts-ignore
import LlamaAI from 'llamaai';


const apiToken = import.meta.env.API_KEY
const llamaAPI = new LlamaAI(apiToken);

const QuestionFormLlamaAI = () => {
  const [newTodo, setNewTodo] = useState('');
  const { addTodo } = useStore();

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const newTodoItem: Todo = {
  //     id: Date.now(),
  //     text: newTodo,
  //   };
  //   addTodo(newTodoItem);
  //   setNewTodo('');
  // };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   try {
  //     // const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
  //     //   prompt: newTodo,
  //     //   max_tokens: 2048,
  //     //   temperature: 0.5,
  //     // }, {
  //     //   headers: {
  //     //     'Content-Type': 'application/json',
  //     //     'Authorization': `Bearer ${API_KEY}`,
  //     //   },
  //     // })
  //
  //     const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${API_KEY}`,
  //       },
  //       body: JSON.stringify({
  //         prompt: newTodo,
  //         max_tokens: 2048,
  //         temperature: 0.5,
  //       }),
  //     })
  //
  //     const data = await response.json()
  //     const answer = data.choices[0].text
  //     const newTodoItem: Todo = {
  //       id: Date.now(),
  //       text: answer,
  //     }
  //     addTodo(newTodoItem)
  //     setNewTodo('')
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const newTodo = event.target.value;
    const newTodo = (event.target as HTMLTextAreaElement).value;

    const apiRequestJson = {
      "messages": [
        {"role": "user", "content": newTodo},
      ],
      "stream": false,
    };

    llamaAPI.run(apiRequestJson)
      .then((response: any) => {
        const answer = response.choices[0].text;
        const newTodoItem: Todo = {
          id: Date.now(),
          text: answer,
        };
        addTodo(newTodoItem);
        setNewTodo('');
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTodo(event.target.value);
  };

  return (
    <div className={styles.box}>
      <div className={styles.user}>
        <span className={styles.online}></span>
        <span className={styles.user_info}>User: <span className={styles.user_item}>Somebody</span> </span>
      </div>
      <div className={styles.login}>
        <form className={styles.loginBx} onSubmit={handleSubmit}>
          <h2><i>Request</i></h2>
          <div className={styles.inptBtn}>
            <textarea value={newTodo} onChange={handleInputChange}
                      className={styles.textarea} placeholder="Question" />
            <button>ADD</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionFormLlamaAI