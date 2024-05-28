import './Home.css';

const Home = () => {
    return (
        <div className="home_body">
            <div className='home_stat'>
                <div className='home_level'>1 Уровень</div>
                <div className='home_done'>
                    <div className='home_distanse_user'>0 км</div>
                    <div className='home_distanse_need'>Осталось 1 км</div>
                </div>
            </div>

            <div className='home_history'>
                <h3>История маршрутов:</h3>
                <div className='home_search_result'>
                    <h2>Ничего не найдено</h2>
                    <p>Посмотрите ближайшие маршруты во вкладке ниже</p>
                </div>
            </div>
        </div>
    )
}

export default Home;