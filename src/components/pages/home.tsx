import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hook/useLocalStorage";
import TrashIcon from "../interface/icon/trash-icon";
import PaperAirplaneIcon from "../interface/icon/paper-airplane-icon";
import PlusIcon from "../interface/icon/plus-icon";
import Card from "../base/card";

function Home() {
  const { removeItem } = useLocalStorage("История России");
  const { removeItem: extra } = useLocalStorage("extra-question");
  const navigate = useNavigate();

  const restoreHandler = () => {
    removeItem();
    navigate("/quiz");
  };
  return (
    <div className="page flex flex-col justify-center items-center gap-5">
      <Card
        title={"Добавить еще вопрос в викторину"}
        p={
          "Вы можете создать свой собственный вопрос, который будет отображаться в конце викторины. Переделайте, пожалуйста, если вы хотите удалить все данные с вашего локального хоста, вы можете нажать «Удалить дополнительный вопрос»."
        }
      >
        <>
          <button
            className="bg-red-500 p-2 rounded text-white text-sm"
            onClick={extra}
          >
            <div>{"Удалить дополнительный вопрос"}</div>
            <TrashIcon />
          </button>
          <Link to={"/add"}>
            <button className="bg-blue-600 p-2 rounded text-white text-sm">
              <div>{"Добавить еще вопрос"}</div>

              <PlusIcon />
            </button>
          </Link>
        </>
      </Card>
      <Card
        title={"Пройти викторину"}
        p={
          "этот тест - это просто случайный тест, который поможет нам показать основной раздел приложения викторины, как оно работает. Он не покажет вам окончательный результат, но показывает разные типы вопросов."
        }
      >
        <>
          <button
            className="bg-red-500 p-2 rounded text-white text-sm"
            onClick={restoreHandler}
          >
            <div>{"Перезапустить викторину"}</div>
            <TrashIcon />
          </button>
          <Link to={"/quiz"}>
            <button className="bg-blue-600 p-2 rounded text-white text-sm">
              <div>{"Продолжить викторину"}</div>
              <PaperAirplaneIcon />
            </button>
          </Link>
        </>
      </Card>
    </div>
  );
}

export default Home;
