import './LoadingSpinner.css';

export function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__circle"></div>
      <p>Загрузка данных о погоде...</p>
    </div>
  );
}
