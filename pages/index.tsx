import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>浙江大学 2022 春夏《软件工程》课程期末作业</title>
        <meta
          name="description"
          content="本网站是浙江大学 2022 春夏《软件工程》课程期末作业" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>软件工程</a> 课程期末作业
        </h1>

        <p className={styles.description}>
          系统共分为四大模块，每个模块已经预先配置好一级路由，请个小组按需求在模块下新增二、三级路由。
        </p>

        <div className={styles.grid}>
          <Link href={'/appointment'}>
            <a className={styles.card}>
              <h2>门诊预约及管理 &rarr;</h2>
              <p>患者可以在该模块预约门诊、查看已经预约的门诊。医生可以在该模块管理及进行门诊。</p>
            </a>
          </Link>

          <Link href={'/account'}>
            <a className={styles.card}>
              <h2>用户信息管理 &rarr;</h2>
              <p>患者和医生可以在这里维护自己的用户信息。患者可以在这里查询医生信息。管理员可以在这里管理所有用户的信息。</p>
            </a>
          </Link>

          <Link href={'/medicine'}>
            <a className={styles.card}>
              <h2>药物平台 &rarr;</h2>
              <p>患者可以在这里查看和某次问诊相关的药物信息。管理员可以在这里进行药物数据的增删改查。</p>
            </a>
          </Link>

          <Link href={'/covid-19-testing'}>
            <a className={styles.card}>
              <h2>新冠检测平台 &rarr;</h2>
              <p>
                患者可以在这里选择空闲的时间段预约新冠检测，以及查看检测报告。管理员可以在这里管理及查看各时间段的余量。
              </p>
            </a>
          </Link>

        </div>
      </main>
    </div>
  );
};

export default Home;
