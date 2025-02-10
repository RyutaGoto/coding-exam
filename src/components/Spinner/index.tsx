import styles from "./styles.module.scss";

type SpinnerProps = {
  isShow: boolean;
  label?: string;
};

/**
 * Spinnerコンポーネントは、ローディングスピナーを表示するためのコンポーネントです。
 *
 * @param isShow - スピナーを表示するかどうかのフラグ。
 * @param label - スピナーの隣に表示するラベル。
 *
 * @example
 * <Spinner isShow={true} label="Loading..." />
 */
export const Spinner = ({ isShow, label }: SpinnerProps) => {
  return (
    <div
      className={styles.spinner}
      style={{ display: isShow ? "flex" : "none" }}
    >
      {label && <span>{label}</span>}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
    .spinner_P7sC{transform-origin:center;animation:spinner_svv2 .75s infinite linear}@keyframes spinner_svv2{100%{transform:rotate(360deg)}}`}
        </style>
        <path
          d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
          className="spinner_P7sC"
        />
      </svg>
    </div>
  );
};
