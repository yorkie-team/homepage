import { Image } from '@/components';
import DashboardUserGreenSVG from '@/public/assets/icons/icon_dashboard_user_green.svg';
import DashboardUserPurpleSVG from '@/public/assets/icons/icon_dashboard_user_purple.svg';
import DashboardUserRedSVG from '@/public/assets/icons/icon_dashboard_user_red.svg';
import DashboardUserYellowSVG from '@/public/assets/icons/icon_dashboard_user_yellow.svg';
import SystemUserGreenSVG from '@/public/assets/icons/icon_system_user_green.svg';
import SystemUserPinkSVG from '@/public/assets/icons/icon_system_user_pink.svg';
import SystemUserPurpleSVG from '@/public/assets/icons/icon_system_user_purple.svg';
import ImgExampleWebtoonSVG from '@/public/assets/images/@tmp/img_example_webtoon.svg';
import { svgMap } from '@/components/Icons/Icon';
import { Icon, IconExpand, IconMinimize, IconCloseSmall } from 'yorkie-ui';

const ExampleContent = () => {
  return (
    <>
      <div className="comment_view">
        <div className="toggle_box">
          <label className="input_toggle_box">
            <input type="checkbox" className="blind" id="iptt-2" />
            <em className="toggle_ui">
              <span className="track"></span>
              <span className="icon ball"></span>
            </em>
            <span className="label">Comment View</span>
          </label>
        </div>
        <div className="comment_box">
          <ol className="commnet_list">
            <li className="comment_item">
              <p className="desc">
                웹툰 제목과 작가 이름이 들어간 표지. 파랑이, 초록이, 빨강이의 얼굴이 크게 줌인. 파랑이 기쁜 표정.
              </p>
              <dl className="dialog_list">
                <div className="dialog">
                  <dt className="name">파랑이</dt>
                  <dd className="chat">반갑습니다 여러분!</dd>
                </div>
              </dl>
              <ul className="user_list">
                <li className="user_item">
                  <span className="icon">
                    <DashboardUserGreenSVG />
                  </span>
                </li>
              </ul>
            </li>
            <li className="comment_item">
              <p className="desc">
                에피소드 시작. 파랑이 등장. 책상 앞에 앉아서 고통스러워 함. 주변 소음 시각적으로 나타남.
              </p>
              <dl className="dialog_list">
                <div className="dialog">
                  <dt className="name">파랑이</dt>
                  <dd className="chat">으으..</dd>
                </div>
              </dl>
              <ul className="user_list">
                <li className="user_item">
                  <span className="icon">
                    <DashboardUserRedSVG />
                  </span>
                </li>
                <li className="user_item">
                  <span className="icon">
                    <DashboardUserPurpleSVG />
                  </span>
                </li>
              </ul>
            </li>
            <li className="comment_item">
              <p className="desc">
                파랑이가 빨강이를 바라보면서 정신이 산만한 표정을 짓고 있다. 파랑이의 좌우에 초록이와 빨강이가 서로
                계속해서 떠들고 있지만 대화 끝날 기미가 보이지 않음. 파랑이 당황한다. 셋 나란히 책상에 앉아있는 모습
                항공뷰로 그리기.
              </p>
              <dl className="dialog_list">
                <div className="dialog">
                  <dt className="name green">초록이</dt>
                  <dd className="chat">지난 번에 이야기하던 것 있잖아. </dd>
                </div>
                <div className="dialog">
                  <dt className="name red">빨강이</dt>
                  <dd className="chat">아니, 내 말 좀 들어봐.</dd>
                </div>
              </dl>
            </li>
          </ol>
          <button type="button" className="btn btn_add">
            <Icon icon={svgMap['pin']} />
            <span className="blind">추가 하기</span>
          </button>
        </div>
      </div>
      <div className="view_box">
        <ol className="view_list">
          <li className="view_item is_active">
            <Image src={'/assets/images/@tmp/example_view1.svg'} width={550} height={320} alt="example1" />
          </li>
          <li className="view_item">
            <Image src={'/assets/images/@tmp/example_view2.svg'} width={590} height={410} alt="example2" />
          </li>
          <li className="view_item">
            <Image src={'/assets/images/@tmp/example_view1.svg'} width={550} height={320} alt="example1" />
          </li>
          <li className="view_item">
            <Image src={'/assets/images/@tmp/example_view2.svg'} width={590} height={410} alt="example2" />
          </li>
        </ol>
      </div>
      <div className="mini_map">
        <div className="mini_map_header">
          <p className="title">Mini Map</p>
          <button type="button" className="btn_minimize">
            <Icon icon={<IconMinimize />} />
            <span className="blind">최소화</span>
          </button>
        </div>
      </div>
    </>
  );
};

export function ShowView() {
  return (
    <div className="content show_view">
      <div className="system_view">
        <div className="system_view_list">
          <div className="system_view_item">
            <a href="#" className="system_link is_active">
              <div className="img_box shadow_m">
                <ImgExampleWebtoonSVG />
              </div>
              <p className="system_name">
                <span className="icon">
                  <SystemUserGreenSVG />
                </span>
                User 1
              </p>
            </a>
            <button type="button" className="btn_close">
              <Icon icon={<IconCloseSmall />} />
              <span className="blind">닫기</span>
            </button>
          </div>
          <div className="system_view_item">
            <a href="#" className="system_link">
              <div className="img_box shadow_m">
                <ImgExampleWebtoonSVG />
              </div>
              <p className="system_name">
                <span className="icon">
                  <SystemUserPurpleSVG />
                </span>
                User 2
              </p>
            </a>
            <button type="button" className="btn_close">
              <Icon icon={<IconCloseSmall />} />
              <span className="blind">닫기</span>
            </button>
            <button type="button" className="btn btn_expand">
              <span className="text">Move to this tab</span>
              <Icon icon={<IconExpand />} />
            </button>
          </div>
          <div className="system_view_item">
            <a href="#" className="system_link">
              <div className="img_box shadow_m">
                <ImgExampleWebtoonSVG />
              </div>
              <p className="system_name">
                <span className="icon">
                  <SystemUserPinkSVG />
                </span>
                User 3
              </p>
            </a>
            <button type="button" className="btn_close">
              <Icon icon={<IconCloseSmall />} />
              <span className="blind">닫기</span>
            </button>
            <button type="button" className="btn btn_expand">
              <span className="text">Open in new tab</span>
              <Icon icon={<IconExpand />} />
            </button>
          </div>
          <div className="system_view_item">
            <a href="#" className="system_link">
              <div className="img_box shadow_m">
                <ImgExampleWebtoonSVG />
              </div>
              <p className="system_name">
                <span className="icon">
                  <SystemUserPurpleSVG />
                </span>
                User 4
              </p>
            </a>
            <button type="button" className="btn_close">
              <Icon icon={<IconCloseSmall />} />
              <span className="blind">닫기</span>
            </button>
            <button type="button" className="btn is_disabled btn_expand gray300">
              <Icon icon={<IconExpand />} />
              <span className="blind">창 활성화 시키기</span>
            </button>
          </div>
        </div>
        <button type="button" className="btn btn_add">
          <Icon icon={svgMap['pin']} />
          <span className="blind">화면 추가하기</span>
        </button>
      </div>
      <div className="show_view_inner">
        <div className="dashboard shadow_m">
          <div className="dashboard_top">
            <span className="user gradient_180deg_green">User 1</span>
            <ul className="user_list">
              <li className="user_item">
                <span className="icon">
                  <DashboardUserGreenSVG />
                </span>
              </li>
              <li className="user_item">
                <span className="icon">
                  <DashboardUserRedSVG />
                </span>
              </li>
              <li className="user_item">
                <span className="icon">
                  <DashboardUserPurpleSVG />
                </span>
              </li>
              <li className="user_item">
                <span className="icon">
                  <DashboardUserYellowSVG />
                </span>
              </li>
            </ul>
          </div>
          <div className="dashboard_content">
            <ExampleContent />
          </div>
        </div>
      </div>
    </div>
  );
}
