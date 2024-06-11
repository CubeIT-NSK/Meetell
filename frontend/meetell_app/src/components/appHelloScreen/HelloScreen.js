import React, { useEffect, useRef } from 'react';
import './HelloScreen.css';

export default function HelloScreen() {
  const parrentRef = useRef();
  useEffect(() => {
    let rectParrent = parrentRef.current.getBoundingClientRect();
    parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
  }, []);

  return (
    <div className="helloScreen" ref={parrentRef}>
      <svg width="226" height="48" viewBox="0 0 226 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M204.442 0V46.72H210.33V0H204.442ZM24.192 45.888C26.0267 46.9547 28.096 47.488 30.4 47.488C32.704 47.488 34.752 46.9547 36.544 45.888C38.3787 44.8213 39.808 43.3707 40.832 41.536C41.8987 39.6587 42.432 37.4827 42.432 35.008V12.736C42.432 11.584 42.7093 10.5387 43.264 9.6C43.8187 8.66133 44.544 7.91467 45.44 7.36C46.3787 6.80533 47.424 6.528 48.576 6.528C49.6853 6.528 50.688 6.80533 51.584 7.36C52.5227 7.91467 53.248 8.66133 53.76 9.6C54.3147 10.5387 54.592 11.584 54.592 12.736V46.72H60.736V13.568C60.736 11.2213 60.224 9.10933 59.2 7.232C58.176 5.35467 56.7467 3.88267 54.912 2.816C53.0773 1.70667 50.9653 1.152 48.576 1.152C46.144 1.152 44.0107 1.70667 42.176 2.816C40.3413 3.88267 38.8907 5.35467 37.824 7.232C36.8 9.10933 36.288 11.2213 36.288 13.568V35.84C36.288 37.0347 36.0107 38.1013 35.456 39.04C34.944 39.936 34.24 40.6613 33.344 41.216C32.448 41.7707 31.4667 42.048 30.4 42.048C29.3333 42.048 28.3307 41.7707 27.392 41.216C26.496 40.6613 25.7707 39.936 25.216 39.04C24.6613 38.1013 24.384 37.0347 24.384 35.84V13.568C24.384 11.2213 23.872 9.10933 22.848 7.232C21.824 5.35467 20.3947 3.88267 18.56 2.816C16.7253 1.70667 14.592 1.152 12.16 1.152C9.77067 1.152 7.65867 1.70667 5.824 2.816C3.98933 3.88267 2.56 5.35467 1.536 7.232C0.512 9.10933 0 11.2213 0 13.568V14.7202H6.144V12.736C6.144 11.584 6.4 10.5387 6.912 9.6C7.46667 8.66133 8.192 7.91467 9.088 7.36C10.0267 6.80533 11.0507 6.528 12.16 6.528C13.2693 6.528 14.2933 6.80533 15.232 7.36C16.1707 7.91467 16.9173 8.66133 17.472 9.6C18.0267 10.5387 18.304 11.584 18.304 12.736V35.008C18.304 37.4827 18.816 39.6587 19.84 41.536C20.9067 43.3707 22.3573 44.8213 24.192 45.888ZM0 22.7202V18.7202H6.144V22.7202H0ZM0 26.7202V30.7202H6.144V26.7202H0ZM0 38.7202V34.7202H6.144V38.7202H0ZM0 42.7202H6.144V46.72H0V42.7202ZM76.9195 44.736C79.6928 46.0587 82.8715 46.72 86.4555 46.72H94.8395V41.664H86.3275C84.2368 41.664 82.3168 41.3227 80.5675 40.64C78.8608 39.9147 77.4528 38.8693 76.3435 37.504C75.2342 36.096 74.5728 34.3893 74.3595 32.384H98.6795C98.7648 32 98.8075 31.552 98.8075 31.04C98.8502 30.528 98.8715 30.0373 98.8715 29.568C98.8715 26.5387 98.3168 23.808 97.2075 21.376C96.0982 18.9013 94.4128 16.9387 92.1515 15.488C89.9328 14.0373 87.1382 13.312 83.7675 13.312C80.6528 13.312 77.9222 14.0587 75.5755 15.552C73.2288 17.0453 71.3942 19.0933 70.0715 21.696C68.7488 24.256 68.0875 27.1573 68.0875 30.4C68.0875 33.6853 68.8555 36.5653 70.3915 39.04C71.9702 41.472 74.1462 43.3707 76.9195 44.736ZM92.9195 28.224H74.2955C74.3808 27.0293 74.6368 25.8347 75.0635 24.64C75.4902 23.4453 76.1088 22.3787 76.9195 21.44C77.7302 20.4587 78.6902 19.6907 79.7995 19.136C80.9515 18.5387 82.2742 18.24 83.7675 18.24C85.1755 18.24 86.3915 18.4533 87.4155 18.88C88.4822 19.3067 89.3568 19.8827 90.0395 20.608C90.7648 21.2907 91.3408 22.08 91.7675 22.976C92.1942 23.8293 92.4928 24.7253 92.6635 25.664C92.8342 26.56 92.9195 27.4133 92.9195 28.224ZM122.955 46.72C119.371 46.72 116.193 46.0587 113.42 44.736C110.646 43.3707 108.47 41.472 106.892 39.04C105.355 36.5653 104.588 33.6853 104.588 30.4C104.588 27.1573 105.249 24.256 106.572 21.696C107.894 19.0933 109.729 17.0453 112.076 15.552C114.422 14.0587 117.153 13.312 120.268 13.312C123.638 13.312 126.433 14.0373 128.652 15.488C130.913 16.9387 132.598 18.9013 133.708 21.376C134.817 23.808 135.372 26.5387 135.372 29.568C135.372 30.0373 135.35 30.528 135.307 31.04C135.307 31.552 135.265 32 135.18 32.384H110.859C111.073 34.3893 111.734 36.096 112.843 37.504C113.953 38.8693 115.361 39.9147 117.067 40.64C118.817 41.3227 120.737 41.664 122.827 41.664H131.34V46.72H122.955ZM110.796 28.224H129.419C129.419 27.4133 129.334 26.56 129.163 25.664C128.993 24.7253 128.694 23.8293 128.268 22.976C127.841 22.08 127.265 21.2907 126.539 20.608C125.857 19.8827 124.982 19.3067 123.915 18.88C122.891 18.4533 121.675 18.24 120.268 18.24C118.774 18.24 117.451 18.5387 116.299 19.136C115.19 19.6907 114.23 20.4587 113.42 21.44C112.609 22.3787 111.99 23.4453 111.563 24.64C111.137 25.8347 110.881 27.0293 110.796 28.224ZM147.167 44.224C148.831 45.888 151.114 46.72 154.016 46.72H161.695V41.664H155.104C153.695 41.664 152.586 41.2587 151.775 40.448C151.007 39.5947 150.624 38.464 150.624 37.056V19.136H161.824V14.08H150.624V5.888H144.736V14.08H139.104V19.136H144.736V37.44C144.736 40.2987 145.546 42.56 147.167 44.224ZM184.518 46.72C180.934 46.72 177.755 46.0587 174.982 44.736C172.209 43.3707 170.033 41.472 168.454 39.04C166.918 36.5653 166.15 33.6853 166.15 30.4C166.15 27.1573 166.811 24.256 168.134 21.696C169.457 19.0933 171.291 17.0453 173.638 15.552C175.985 14.0587 178.715 13.312 181.83 13.312C185.201 13.312 187.995 14.0373 190.214 15.488C192.475 16.9387 194.161 18.9013 195.27 21.376C196.379 23.808 196.934 26.5387 196.934 29.568C196.934 30.0373 196.913 30.528 196.87 31.04C196.87 31.552 196.827 32 196.742 32.384H172.422C172.635 34.3893 173.297 36.096 174.406 37.504C175.515 38.8693 176.923 39.9147 178.63 40.64C180.379 41.3227 182.299 41.664 184.39 41.664H192.902V46.72H184.518ZM172.358 28.224H190.982C190.982 27.4133 190.897 26.56 190.726 25.664C190.555 24.7253 190.257 23.8293 189.83 22.976C189.403 22.08 188.827 21.2907 188.102 20.608C187.419 19.8827 186.545 19.3067 185.478 18.88C184.454 18.4533 183.238 18.24 181.83 18.24C180.337 18.24 179.014 18.5387 177.862 19.136C176.753 19.6907 175.793 20.4587 174.982 21.44C174.171 22.3787 173.553 23.4453 173.126 24.64C172.699 25.8347 172.443 27.0293 172.358 28.224ZM219.692 21.7202V0H225.58V21.7202H219.692ZM219.692 25.7202V29.7202H225.58V25.7202H219.692ZM225.58 33.7202H219.692V37.7202H225.58V33.7202ZM225.58 41.7202H219.692V45.7202H225.58V41.7202Z" fill="white"/>
      </svg>
    </div>
  );
}
