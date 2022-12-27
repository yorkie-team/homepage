import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ExampleLayout, Accordion, CodeBlock } from '@/components';
import { Sidebar, FullView, ShowView, GridView, DualView } from '@/components/exampleView';

const sampleCode = `
<div>There are currently <span id='peersCount'></span> peers!</div>

<!-- include yorkie js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/yorkie-js-sdk/0.2.16/yorkie-js-sdk.js"></script>
<script>
  async function main() {
    const client = new yorkie.Client('${process.env.NEXT_PUBLIC_API_ADDR}', {
      apiKey: 'MY_API_KEY',
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
  main();
</script>`;

const ExamplesView: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string | null>('about');
  return (
    <ExampleLayout breadcrumbTitle="Creating Webtoons" viewTypes={['full', 'show', 'grid']} defaultViewType="show">
      {({ viewType }) => (
        <>
          <Head>
            <title>Creating Webtoons · Yorkie Examples</title>
          </Head>
          <Sidebar defaultOpened={viewType !== 'full'}>
            <Sidebar.Tabs defaultTab="about" onTabChange={setActiveTab}>
              <Sidebar.Top>
                <Sidebar.TabsList>
                  <Sidebar.TabsTab value="about">About</Sidebar.TabsTab>
                  <Sidebar.TabsTab value="code">Live Code</Sidebar.TabsTab>
                </Sidebar.TabsList>
              </Sidebar.Top>
              <Sidebar.TabsPanel value="about">
                <Sidebar.GuideTitle>Webtoon scenario maker</Sidebar.GuideTitle>
                <Sidebar.GuideDescription>
                  Because drawing a webtoon requires several steps, experts in various roles often collaborate. There is
                  a lot of discussion and feedback in creating a scenario. Webtoon Scenario Maker includes &apos;drawing
                  comments&apos;, &apos;comments view&apos;, &apos;mini map&apos; and &apos;character library.&apos;
                </Sidebar.GuideDescription>
                <Sidebar.GuideSubTitle>Try this!</Sidebar.GuideSubTitle>
                <Accordion defaultValue={[]} multiple>
                  {[
                    {
                      title: 'Drawing comments',
                      description:
                        "Press the 'comment' button on the bottom or the 'C key' on the keyboard, and then press any space on the screen. You can leave text comments and drawing comments on that location. Feel free to generate drawing comments by moving your cursor out of the text window.",
                    },
                    {
                      title: 'Comments view',
                      description:
                        'Try pressing the top left toggle button to open the comment view. You can collect and view all comments for each cut of the cartoon.',
                    },
                    {
                      title: 'Mini map',
                      description:
                        'Use the mini-map feature in the upper right corner to see what other users are viewing. You can identify the location of each user in real time.',
                    },
                    {
                      title: 'Character library',
                      description:
                        "In the text content area on the left, add a description of the new cut and write the characters' lines. Once you have registered your characters, they can be stored in the library and reused.",
                    },
                  ].map(({ title, description }) => (
                    <Accordion.Item key={title} value={title}>
                      <Accordion.Control>{title}</Accordion.Control>
                      <Accordion.Panel>{description}</Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Sidebar.TabsPanel>
              <Sidebar.TabsPanel value="code">
                <div className="codeblock_box">
                  <CodeBlock code={sampleCode} language="javascript" withLineNumbers />
                </div>
              </Sidebar.TabsPanel>
              <Sidebar.Bottom
                codeURL="https://github.com/yorkie-team/yorkie-js-sdk/tree/main/examples/"
                shareButton={activeTab === 'about'}
              >
                <Sidebar.GuideDescription>Last updated 4 days ago</Sidebar.GuideDescription>
              </Sidebar.Bottom>
            </Sidebar.Tabs>
          </Sidebar>
          {viewType === 'full' && <FullView />}
          {viewType === 'show' && <ShowView />}
          {viewType === 'grid' && <GridView />}
          {viewType === 'split' && <DualView />}
        </>
      )}
    </ExampleLayout>
  );
};

export default ExamplesView;
