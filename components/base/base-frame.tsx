import React from 'react';
import styles from '../../styles/base-frame.module.css';
import Image from 'next/image';

type Props = {
  src: string;
};

const BaseFrame: React.FC<Props> = ({ src }) => {
  return (
    <div className={styles['preview']}>
      <Image src={src} layout="fill" alt="showcase-1" />
    </div>
  );
};

export default BaseFrame;
