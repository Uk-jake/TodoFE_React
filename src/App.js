// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  // 상태 정의하기: 데이터 저장을 위해
  const [todos, setTodos] = useState(null);
  const [error, setError] = useState(null);

  // 데이터 가져오기: 페이지 로드 시 및 일정 간격으로
  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ecs.ukjake.com/todos');
        setTodos(response.data); // 성공적으로 데이터를 가져왔을 때 상태를 설정
        setError(null); // 오류가 발생하지 않았음을 명확히 설정
      } catch (err) {
        setError('데이터를 가져오는 도중 오류가 발생했습니다.');
      }
    };

    // 페이지 로드 시 즉시 데이터를 가져오기
    fetchData();

    // 5초마다 데이터를 가져오기 위한 타이머 설정
    const intervalId = setInterval(fetchData, 5000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(intervalId);
  }, []); // 빈 배열을 두어 처음 한 번과 주기적으로 실행되도록 설정

  // 페이지에 데이터 렌더링
  return (
    <div className="App">
      <h1>Todo List</h1>
      {error && <p>{error}</p>} {/* 오류 메시지 표시 */}
      {todos ? (
        <pre>{JSON.stringify(todos, null, 2)}</pre> // JSON 데이터를 들여쓰기와 함께 문자열로 변환하여 표시
      ) : (
        <p>할 일을 불러오는 중입니다...</p> // 데이터가 아직 없을 때 표시
      )}
    </div>
  );
}

export default App;
