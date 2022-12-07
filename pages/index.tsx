import { useState } from 'react';
import classNames from 'classnames';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Layout, Button, Icon, CodeBlock, CodeBlockHeader, Accordion } from '@/components';
import { ChartMotion, StateSharingMotion, ServerMotion, MainBannerMotion } from '@/components/motions';
import UserGroupSVG from '@/public/assets/icons/icon_service_main_users_group.svg';
import CollaboProfileSVG from '@/public/assets/icons/icon_collaborate_profile.svg';
import CollaboCursorSVG from '@/public/assets/icons/icon_collaborate_cursor.svg';
import CollaboSelectionSVG from '@/public/assets/icons/icon_collaborate_selection.svg';
import CollaboEditingSVG from '@/public/assets/icons/icon_collaborate_editing.svg';

type FeatureType = 'profile' | 'cursor' | 'selection' | 'editing';
const sampleCode = `import yorkie from 'yorkie-js-sdk';

async function main() {
  const client = new yorkie.Client('xxxx', {
    apiKey: 'xxxx',
  });
  await client.activate();

  const doc = new yorkie.Document('my-first-document');
  await client.attach(doc);

  client.subscribe((event) => {
    if (event.type === 'peers-changed') {
      const peers = event.value[doc.getKey()];
      document.getElementById('peersCount').innerHTML = Object.entries(peers).length;
    }
  });
}
main();`;

const Home: NextPage = () => {
  const [bannerActive, setBannerActive] = useState(false);
  const [activeFeatureCard, setActiveFeatureCard] = useState<FeatureType>('profile');

  // TODO(hackerwins): Remove examples condition when examples are ready.
  return (
    <Layout className="main_page">
      <Head>
        <title>Yorkie</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="content">
        <section className="key_visual">
          <div className="kv_bg">
            <MainBannerMotion bannerActive={bannerActive} />
          </div>
          <div className="inner">
            <h2 className="title">
              <span className="text">Breathe</span>
              <span className={classNames('point', { is_hover: bannerActive })}>
                collaboration
                <span className="bg"></span>
              </span>
              <span className="text">your products</span>
            </h2>
            <Button.Box>
              <a
                href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`}
                className="btn orange_0 btn_start"
                onPointerOver={() => setBannerActive(true)}
                onPointerOut={() => setBannerActive(false)}
              >
                <span className="bg"></span>
                <Icon type="star" />
                <span className="text">Start for free</span>
              </a>
            </Button.Box>
            <p className="desc">
              Open-source SDKs, Server, Database API package for real-time collaborative experiences
            </p>
          </div>
        </section>
        <section className="section section_app">
          <div className="align_box">
            <div className="app_header">
              <h2 className="tag_name">Putting Yorkie, Extending Your App</h2>
              <span className="icon">
                <UserGroupSVG />
              </span>
            </div>
            <div className="app_body">
              <strong className="section_title">
                Make your product
                <br />
                <span className="point">collaborative</span> in a flash!
              </strong>
              <p className="section_desc">
                Don&#39;t waste time and money implementing collaboration features. <br className="br_tablet" />
                <br className="br_mo" />
                <br className="br_mo_xs" /> Leverage our free API-based services
                <br className="br_pc" />
                <br className="br_mo_xs" /> to quickly and easily build high-performance
                <br className="br_tablet" /> collaborative features for your products.
              </p>
              <Button.Box>
                <Button as="link" href="/docs/quick-start" className="orange_0" icon={<Icon type="book" />}>
                  Quick start guide
                </Button>
                <Button as="link" href="/docs" outline icon={<Icon type="book" />}>
                  Read documentation
                </Button>
              </Button.Box>
            </div>
          </div>
        </section>
        <section className="section">
          <h2 className="section_title">
            Every feature
            <br className="br_mo_xs" /> you need
            <br /> to start collaborating.
          </h2>
          <p className="section_desc">
            Add stable and diverse collaborative features
            <br className="br_mo" /> to your product with Yorkie.
            <br className="br_tablet" />
            <br className="br_mo_xs" /> Now it&#39;s not difficult to
            <br className="br_mo" /> make a local-
            <br className="br_pc" />
            based product collaborative.
            <br className="br_tablet" />
            <br className="br_mo" />
            <br className="br_mo_xs" /> Put basic features of collaborative tools
            <br className="br_mo_xs" /> on your
            <br className="br_mo" /> product
            <br className="br_tablet" /> and provide a completely
            <br className="br_pc" /> different online real-time experience.
          </p>
          <div className="section_content">
            <ul
              className="service_card_list"
              onClick={(e) => {
                const target = (e.target as Element).closest('.service_card_menu');
                if (!target) return;

                setActiveFeatureCard(target.getAttribute('data-item') as FeatureType);
              }}
            >
              <li className={classNames('service_card_item', { is_active: activeFeatureCard === 'profile' })}>
                <button type="button" className="service_card_menu" data-item="profile">
                  <span className="img_box">
                    <CollaboProfileSVG />
                  </span>
                  <strong className="service_card_title">Profile Stack</strong>
                  <span className="service_card_desc">
                    The Profile Stack feature shows the profile of the current users in real-time to announce that
                    multiple users are connected at the same time.
                  </span>
                </button>
              </li>
              <li className={classNames('service_card_item', { is_active: activeFeatureCard === 'cursor' })}>
                <button type="button" className="service_card_menu" data-item="cursor">
                  <span className="img_box">
                    <CollaboCursorSVG />
                  </span>
                  <strong className="service_card_title">Multi-Cursor</strong>
                  <span className="service_card_desc">
                    The Multi-Cursor shows the location of the cursor of the users who accessed the same canvas in
                    real-time. Each cursor shows the user&#39;s nickname and role as needed.
                  </span>
                </button>
              </li>
              <li className={classNames('service_card_item', { is_active: activeFeatureCard === 'selection' })}>
                <button type="button" className="service_card_menu" data-item="selection">
                  <span className="img_box">
                    <CollaboSelectionSVG />
                  </span>
                  <strong className="service_card_title">Live Selection</strong>
                  <span className="service_card_desc">
                    Live Selection displays the object selected by each user who accesses the same canvas. Users can see
                    what each other is doing in real-time.
                  </span>
                </button>
              </li>
              <li className={classNames('service_card_item', { is_active: activeFeatureCard === 'editing' })}>
                <button type="button" className="service_card_menu" data-item="editing">
                  <span className="img_box">
                    <CollaboEditingSVG />
                  </span>
                  <strong className="service_card_title">Multiplayer Editing</strong>
                  <span className="service_card_desc">
                    Interact in real-time with the presence of others and edit material together. Any real-time
                    interaction, such as texting, drawing, commenting, or expressing emotion, could be shared with
                    Yorkie.
                  </span>
                </button>
              </li>
            </ul>
            <CodeBlock.Wrapper>
              <CodeBlockHeader>
                <CodeBlockHeader.LeftBox>
                  <button type="button" className="btn_item is_active">
                    React
                  </button>
                  <button type="button" className="btn_item">
                    Redux
                  </button>
                </CodeBlockHeader.LeftBox>
                <CodeBlockHeader.RightBox>
                  <CodeBlockHeader.CopyButton value={sampleCode} />
                </CodeBlockHeader.RightBox>
              </CodeBlockHeader>
              <CodeBlock code={sampleCode} language="javascript" withLineNumbers />
            </CodeBlock.Wrapper>
          </div>
        </section>
        <section className="section">
          <h2 className="section_title">
            What experiences <br />
            can you create
            <br className="br_mo_xs" /> with Yorkie?
          </h2>
          <p className="section_desc">Test our examples to add diverse collaborative features to your product.</p>
          <div className="section_content draw">
            <div className="draw_box"></div>
            <div className="draw_box"></div>
          </div>
          {
            process.env.NODE_ENV === 'development' && (
              <Button.Box>
                <Button as="link" href="/examples" className="orange_0" icon={<Icon type="bulb" />}>
                  View all examples
                </Button>
              </Button.Box>
            )
          }
        </section>
        <section className="section">
          <h2 className="section_title">
            Stable.
            <br />
            Reliable.
            <br />
            Manageable.
          </h2>
          <div className="section_content">
            <ul className="horizon_list">
              <li className="horizon_item">
                <div className="img_box">
                  <StateSharingMotion />
                </div>
                <div className="text_box">
                  <strong className="title">Conflict-free state sharing</strong>
                  <p className="desc">
                    Yorkie implements real-time collaboration API based on the CRDT algorithm.
                    <br className="br_tablet" /> CRDT is formed in solid and clean architecture, effectively resolving
                    conflicts when editing multiple concurrent data.
                  </p>
                  <Button as="link" href="/products#multiplayer" className="gray800" icon={<Icon type="book" />}>
                    Learn more about state sharing
                  </Button>
                </div>
              </li>
              <li className="horizon_item">
                <div className="img_box">
                  <ChartMotion />
                </div>
                <div className="text_box">
                  <strong className="title">Real-time usage monitoring</strong>
                  <p className="desc">
                    Dashboard allows project members to browse stored documents and supervise the data warehouse
                    easily.
                  </p>
                  <Button
                    as="link"
                    href="/products#real-time-monitoring"
                    className="gray800"
                    icon={<Icon type="book" />}
                  >
                    Learn more about monitoring
                  </Button>
                </div>
              </li>
              <li className="horizon_item">
                <div className="img_box">
                  <ServerMotion />
                </div>
                <div className="text_box">
                  <strong className="title">Easy cloud server or self-hosted server</strong>
                  <p className="desc">
                    If needed, Yorkie open source packages allow you to build self-hosted server.
                  </p>
                  <Button as="link" href="/products#self-hosted-server" className="gray800" icon={<Icon type="book" />}>
                    How to build a self-hosted server
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className="section section_faq">
          <h2 className="section_title">FAQ</h2>
          <div className="section_content">
            <Accordion defaultValue={[]} multiple icon={null}>
              <Accordion.Item value="faq1">
                <Accordion.Control>
                  <Icon type="messageSquare" />
                  Can we use the Yorkie for free?
                </Accordion.Control>
                <Accordion.Panel>
                  Yes, Yorkie is free to use. <br/><br/>
                  You can access it at no cost. Please note that the availability of the service and any associated features
                  may be subject to change without notice. It is always a good idea to check the latest information on the
                  service&apos;s website to ensure that it is still available and meets your needs.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="faq2">
                <Accordion.Control>
                  <Icon type="messageSquare" />
                  Is the Yorkie production ready?
                </Accordion.Control>
                <Accordion.Panel>
                  No, Yorkie is not yet production ready. <br/><br/>
                  While the CRDT algorithm has been verified, not all of the code has been fully battle-tested. The developers of the
                  service currently estimate that the right time to use it in a production environment will be <b>around summer of &apos;23</b>.
                  Until then, it is recommended to carefully evaluate the service&apos;s capabilities and reliability before using
                  it in a production setting. It is also important to note that the availability and features of the service
                  may change without notice, so it is always best to check the latest information on the service&apos;s website before using it. 
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="faq3">
                <Accordion.Control>
                  <Icon type="messageSquare" />
                  How can I contribute to the Yorkie project?
                </Accordion.Control>
                <Accordion.Panel>
                  Yorkie is an open source project, so there are many ways to contribute to its development. <br /><br />
                  One way to contribute is by reporting any bugs you encounter while using the service. You can also submit
                  pull requests with improvements or new features that you have developed. If you plan to use Yorkie in your
                  company, you can also consider donating to the Yorkie community to support its continued development.
                  You can learn more about how to contribute to the Yorkie project on its website or by visiting our <u><a href="https://discord.com/invite/MVEAwz9sBy">Discord</a></u>.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>
          <Button.Box>
            <Button
              as="a"
              href="https://discord.gg/MVEAwz9sBy"
              outline
              icon={<Icon type="smile" />}
              target="_blank"
              rel="noreferrer"
            >
              Contact
            </Button>
            <Button as="a" href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`} className="orange_0 btn_start" icon={<Icon type="twinkle" />}>
              Start for free
            </Button>
          </Button.Box>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
