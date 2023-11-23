import classNames from "classnames";
import styles from "./Header.module.css";

type Props = {
  className?: string;
};

export const Header = ({ className }: Props) => {
  return (
    <div
      className={classNames(
        className,
        styles.headerBackdrop,
        "flex justify-center"
      )}
    >
      <div
        className={classNames(
          "flex items-center justify-between p-m pt-l w-[780px]"
        )}
      >
        <Icon name="home" />
        {logo}
        <Icon name="more" />
      </div>
    </div>
  );
};

const logo = (
  <svg
    width="60"
    height="18"
    viewBox="0 0 60 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.08433 17L3.75033 10.469V17H0.810328V2.342H3.75033V8.915L9.08433 2.342H12.6333L6.58533 9.608L12.8013 17H9.08433ZM25.7181 5.366V17H22.7571V15.53C22.3791 16.034 21.8821 16.433 21.2661 16.727C20.6641 17.007 20.0061 17.147 19.2921 17.147C18.3821 17.147 17.5771 16.958 16.8771 16.58C16.1771 16.188 15.6241 15.621 15.2181 14.879C14.8261 14.123 14.6301 13.227 14.6301 12.191V5.366H17.5701V11.771C17.5701 12.695 17.8011 13.409 18.2631 13.913C18.7251 14.403 19.3551 14.648 20.1531 14.648C20.9651 14.648 21.6021 14.403 22.0641 13.913C22.5261 13.409 22.7571 12.695 22.7571 11.771V5.366H25.7181ZM30.1099 3.98C29.5919 3.98 29.1579 3.819 28.8079 3.497C28.4719 3.161 28.3039 2.748 28.3039 2.258C28.3039 1.768 28.4719 1.362 28.8079 1.04C29.1579 0.703999 29.5919 0.535999 30.1099 0.535999C30.6279 0.535999 31.0549 0.703999 31.3909 1.04C31.7409 1.362 31.9159 1.768 31.9159 2.258C31.9159 2.748 31.7409 3.161 31.3909 3.497C31.0549 3.819 30.6279 3.98 30.1099 3.98ZM31.5589 5.366V17H28.6189V5.366H31.5589ZM33.7076 11.141C33.7076 9.965 33.9386 8.922 34.4006 8.012C34.8766 7.102 35.5206 6.402 36.3326 5.912C37.1446 5.422 38.0476 5.177 39.0416 5.177C39.7976 5.177 40.5186 5.345 41.2046 5.681C41.8906 6.003 42.4366 6.437 42.8426 6.983V1.46H45.8246V17H42.8426V15.278C42.4786 15.852 41.9676 16.314 41.3096 16.664C40.6516 17.014 39.8886 17.189 39.0206 17.189C38.0406 17.189 37.1446 16.937 36.3326 16.433C35.5206 15.929 34.8766 15.222 34.4006 14.312C33.9386 13.388 33.7076 12.331 33.7076 11.141ZM42.8636 11.183C42.8636 10.469 42.7236 9.86 42.4436 9.356C42.1636 8.838 41.7856 8.446 41.3096 8.18C40.8336 7.9 40.3226 7.76 39.7766 7.76C39.2306 7.76 38.7266 7.893 38.2646 8.159C37.8026 8.425 37.4246 8.817 37.1306 9.335C36.8506 9.839 36.7106 10.441 36.7106 11.141C36.7106 11.841 36.8506 12.457 37.1306 12.989C37.4246 13.507 37.8026 13.906 38.2646 14.186C38.7406 14.466 39.2446 14.606 39.7766 14.606C40.3226 14.606 40.8336 14.473 41.3096 14.207C41.7856 13.927 42.1636 13.535 42.4436 13.031C42.7236 12.513 42.8636 11.897 42.8636 11.183ZM53.8621 17.189C52.7421 17.189 51.7341 16.944 50.8381 16.454C49.9421 15.95 49.2351 15.243 48.7171 14.333C48.2131 13.423 47.9611 12.373 47.9611 11.183C47.9611 9.993 48.2201 8.943 48.7381 8.033C49.2701 7.123 49.9911 6.423 50.9011 5.933C51.8111 5.429 52.8261 5.177 53.9461 5.177C55.0661 5.177 56.0811 5.429 56.9911 5.933C57.9011 6.423 58.6151 7.123 59.1331 8.033C59.6651 8.943 59.9311 9.993 59.9311 11.183C59.9311 12.373 59.6581 13.423 59.1121 14.333C58.5801 15.243 57.8521 15.95 56.9281 16.454C56.0181 16.944 54.9961 17.189 53.8621 17.189ZM53.8621 14.627C54.3941 14.627 54.8911 14.501 55.3531 14.249C55.8291 13.983 56.2071 13.591 56.4871 13.073C56.7671 12.555 56.9071 11.925 56.9071 11.183C56.9071 10.077 56.6131 9.23 56.0251 8.642C55.4511 8.04 54.7441 7.739 53.9041 7.739C53.0641 7.739 52.3571 8.04 51.7831 8.642C51.2231 9.23 50.9431 10.077 50.9431 11.183C50.9431 12.289 51.2161 13.143 51.7621 13.745C52.3221 14.333 53.0221 14.627 53.8621 14.627Z"
      fill="black"
    />
  </svg>
);

const Icon = ({ name }: { name: string }) => {
  let iconSvg = getIconSvg(name);
  if (iconSvg === null) {
    return null;
  }
  return (
    <div className="flex items-center justify-center w-[40px] h-[40px] rounded-[8px] bg-[#f2f2f2]">
      {iconSvg}
    </div>
  );
};

const getIconSvg = (name: string) => {
  switch (name) {
    case "home":
      return iconHome;
    case "more":
      return iconMore;
    default:
      return null;
  }
};

const iconHome = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.0001 3.56935L16.0001 3.56937L16.0038 3.57265L23.0001 9.70602C23.0007 9.70655 23.0013 9.70708 23.0019 9.70761C23.3174 9.99027 23.5695 10.3366 23.7416 10.7237C23.914 11.1116 24.0021 11.5316 24.0001 11.956V11.9583V22.1667C24.0001 22.9623 23.684 23.7254 23.1214 24.288C22.5588 24.8506 21.7958 25.1667 21.0001 25.1667H7.00011C6.20446 25.1667 5.4414 24.8506 4.87879 24.288C4.31618 23.7254 4.00011 22.9623 4.00011 22.1667V11.97H4.00013L4.00009 11.966C3.99671 11.5399 4.08414 11.118 4.25657 10.7283C4.42868 10.3393 4.68153 9.9914 4.99833 9.70761L11.9964 3.57265L11.9964 3.57267L12.0001 3.56935C12.5501 3.0774 13.2622 2.80542 14.0001 2.80542C14.738 2.80542 15.4501 3.0774 16.0001 3.56935ZM16.3334 23.8333H16.8334V23.3333V17.5C16.8334 17.058 16.6578 16.6341 16.3453 16.3215C16.0327 16.0089 15.6088 15.8333 15.1668 15.8333H12.8334C12.3914 15.8333 11.9675 16.0089 11.6549 16.3215C11.3424 16.6341 11.1668 17.058 11.1668 17.5V23.3333V23.8333H11.6668H16.3334ZM18.1668 23.3333V23.8333H18.6668H21.0001C21.4421 23.8333 21.8661 23.6577 22.1786 23.3452C22.4912 23.0326 22.6668 22.6087 22.6668 22.1667V11.9583V11.9577C22.6665 11.7211 22.6158 11.4872 22.5181 11.2717L22.0627 11.4781L22.5181 11.2717C22.4204 11.0561 22.2779 10.8639 22.1001 10.7077L22.0994 10.7071L15.1001 4.58271C15.1 4.58258 15.0998 4.58245 15.0997 4.58232C14.7956 4.31536 14.4048 4.16815 14.0001 4.16815C13.5955 4.16815 13.2046 4.31536 12.9006 4.58232C12.9004 4.58245 12.9003 4.58258 12.9001 4.58271L5.90086 10.7071L5.90011 10.7077C5.72233 10.8639 5.57985 11.0561 5.48214 11.2717C5.38443 11.4872 5.33374 11.7211 5.33344 11.9577V11.9583V22.1667C5.33344 22.6087 5.50904 23.0326 5.8216 23.3452C6.13416 23.6577 6.55808 23.8333 7.00011 23.8333H9.33344H9.83344V23.3333V17.5C9.83344 16.7044 10.1495 15.9413 10.7121 15.3787C11.2747 14.8161 12.0378 14.5 12.8334 14.5H15.1668C15.9624 14.5 16.7255 14.8161 17.2881 15.3787C17.8507 15.9413 18.1668 16.7044 18.1668 17.5V23.3333Z"
      fill="black"
      stroke="#656366"
    />
  </svg>
);

const iconMore = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5244 15.0185L15.9401 15.2963L15.5244 15.0185C15.3229 15.32 15.0366 15.555 14.7016 15.6938C14.3666 15.8325 13.998 15.8688 13.6423 15.7981C13.2867 15.7274 12.96 15.5527 12.7036 15.2964C12.4472 15.04 12.2726 14.7133 12.2019 14.3577C12.1312 14.002 12.1675 13.6334 12.3062 13.2984C12.445 12.9634 12.68 12.6771 12.9815 12.4756C13.2829 12.2742 13.6374 12.1667 14 12.1667C14.4862 12.1667 14.9525 12.3598 15.2964 12.7036C15.6402 13.0474 15.8333 13.5138 15.8333 14C15.8333 14.3626 15.7258 14.717 15.5244 15.0185ZM4.81479 12.4756C5.11628 12.2742 5.47074 12.1667 5.83333 12.1667C6.31956 12.1667 6.78588 12.3598 7.1297 12.7036C7.47351 13.0474 7.66667 13.5138 7.66667 14C7.66667 14.3626 7.55914 14.717 7.3577 15.0185C7.15625 15.32 6.86992 15.555 6.53492 15.6938C6.19992 15.8325 5.8313 15.8688 5.47567 15.7981C5.12004 15.7274 4.79337 15.5527 4.53697 15.2964C4.28058 15.04 4.10597 14.7133 4.03523 14.3577C3.96449 14.002 4.00079 13.6334 4.13956 13.2984C4.27832 12.9634 4.5133 12.6771 4.81479 12.4756ZM21.1481 12.4756C21.4496 12.2742 21.8041 12.1667 22.1667 12.1667C22.6529 12.1667 23.1192 12.3598 23.463 12.7036C23.8068 13.0474 24 13.5138 24 14C24 14.3626 23.8925 14.717 23.691 15.0185C23.4896 15.32 23.2033 15.555 22.8683 15.6938C22.5333 15.8325 22.1646 15.8688 21.809 15.7981C21.4534 15.7274 21.1267 15.5527 20.8703 15.2964C20.6139 15.04 20.4393 14.7133 20.3686 14.3577C20.2978 14.002 20.3341 13.6334 20.4729 13.2984C20.6116 12.9634 20.8466 12.6771 21.1481 12.4756Z"
      fill="black"
      stroke="#656366"
    />
  </svg>
);