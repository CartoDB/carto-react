import { LEGEND_TYPES } from '@carto/react-ui';

export const fixtures = [
  {
    id: 'applicants',
    title: 'Applicants',
    visible: false,
    switchable: true,
    opacity: 0.4,
    showOpacityControl: true,
    minZoom: 4,
    maxZoom: 9,
    legend: {
      collapsed: false,
      type: LEGEND_TYPES.ICON,
      icons: [
        `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <rect width="24" height="24" fill="#dd3741" rx="4" />
        </svg>`
      ].map((txt) => txt.replace(/#/g, '%23')),
      labels: ['Applicants']
    }
  },
  {
    id: 'basemap',
    title: 'Basemap',
    legend: {
      type: 'basemap',
      collapsible: false,
      select: {
        label: 'Select basemap',
        value: 'light',
        options: [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' }
        ]
      }
    }
  },
  {
    id: 'avland',
    title: 'Available Land',
    visible: true,
    switchable: true,
    legend: [
      {
        collapsed: false,
        type: LEGEND_TYPES.ICON,
        icons: [
          `data:image/svg+xml,<svg width="26" height="42" view-box="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9898 13.5C24.9966 13.3342 25 13.1675 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 13.1675 1.00343 13.3342 1.01023 13.5H1C1 15 1.66667 17.1667 2 18L13 39.5L24 18C24.7689 16.4972 25.0079 14.2072 25 13.5H24.9898Z" fill="#D40511"/>
            <path d="M24.9898 13.5L23.9906 13.4591L23.948 14.5H24.9898V13.5ZM1.01023 13.5V14.5H2.05205L2.00939 13.459L1.01023 13.5ZM1 13.5V12.5H0V13.5H1ZM2 18L1.07152 18.3714L1.08869 18.4143L1.10975 18.4555L2 18ZM13 39.5L12.1098 39.9555L13 41.6955L13.8902 39.9555L13 39.5ZM24 18L23.1098 17.5445V17.5445L24 18ZM25 13.5L25.9999 13.4889L25.9889 12.5H25V13.5ZM24 13C24 13.1538 23.9968 13.3069 23.9906 13.4591L25.9889 13.5409C25.9963 13.3615 26 13.1811 26 13H24ZM13 2C19.0751 2 24 6.92487 24 13H26C26 5.8203 20.1797 0 13 0V2ZM2 13C2 6.92487 6.92487 2 13 2V0C5.8203 0 0 5.8203 0 13H2ZM2.00939 13.459C2.00315 13.3069 2 13.1538 2 13H0C0 13.1811 0.00371128 13.3615 0.0110667 13.541L2.00939 13.459ZM1 14.5H1.01023V12.5H1V14.5ZM2.92848 17.6286C2.78084 17.2595 2.54409 16.5532 2.34514 15.7575C2.14373 14.9518 2 14.1282 2 13.5H0C0 14.3718 0.189607 15.3815 0.404858 16.2425C0.622579 17.1134 0.885825 17.9071 1.07152 18.3714L2.92848 17.6286ZM13.8902 39.0445L2.89025 17.5445L1.10975 18.4555L12.1098 39.9555L13.8902 39.0445ZM23.1098 17.5445L12.1098 39.0445L13.8902 39.9555L24.8902 18.4555L23.1098 17.5445ZM24.0001 13.5111C24.0031 13.7838 23.9544 14.4669 23.8075 15.2721C23.6602 16.0796 23.43 16.9186 23.1098 17.5445L24.8902 18.4555C25.3389 17.5786 25.6126 16.5212 25.775 15.6311C25.9379 14.7388 26.0048 13.9234 25.9999 13.4889L24.0001 13.5111ZM24.9898 14.5H25V12.5H24.9898V14.5Z" fill="white"/>
            <circle id="Ellipse 10" cx="13" cy="13" r="3" fill="white" stroke="white" stroke-width="2"/>
          </svg>`
        ].map((txt) => txt.replace(/#/g, '%23')),
        colors: ['#D40511'],
        labels: ['Available land']
      },
      {
        collapsed: false,
        type: LEGEND_TYPES.PROPORTION,
        labels: [1, 1000]
      }
    ]
  },
  {
    id: 'catchment',
    title: 'Catchment Area',
    visible: true,
    switchable: true,
    legend: {
      collapsed: false,
      type: LEGEND_TYPES.CATEGORY,
      colors: [`#FC483F33`],
      labels: ['Catchment Area']
    }
  },
  {
    id: 'cust-loc',
    title: 'Customer Locations',
    visible: false,
    switchable: true,
    legend: {
      collapsed: false,
      type: LEGEND_TYPES.CATEGORY,
      colors: ['#C8C8C8'],
      labels: ['Others']
    }
  },
  {
    id: 'employees',
    title: 'Employees',
    visible: false,
    switchable: true,
    opacity: 0.4,
    showOpacityControl: true,
    legend: {
      collapsed: false,
      type: LEGEND_TYPES.ICON,
      icons: [
        `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <rect width="24" height="24" fill="#ffd633" rx="4" />
        </svg>`
      ].map((txt) => txt.replace(/#/g, '%23')),
      labels: ['Employees']
    }
  },
  {
    id: 'existing-ops',
    title: 'DSC Existing Operations',
    visible: true,
    switchable: true,
    legend: {
      collapsed: false,
      type: LEGEND_TYPES.ICON,
      icons: [
        `data:image/svg+xml,<svg width="154" height="154" viewBox="0 0 154 154" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.5" cx="76.7998" cy="76.8" r="64" fill="white"/>
          <circle cx="76.7996" cy="76.8001" r="51.2" fill="#FFCC00"/>
          <circle cx="76.8002" cy="76.7999" r="25.6" fill="#D40511"/>
        </svg>`
      ].map((txt) => txt.replace(/#/g, '%23')),
      labels: ['DSC Existing Operations']
    }
  },
  {
    id: 'spatial-index',
    title: 'Spatial Index',
    visible: true,
    opacity: 100 / 255,
    switchable: true,
    showOpacityControl: true,
    legend: {
      collapsed: false,
      type: LEGEND_TYPES.BINS,
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
      colors: [
        '#ffffe5',
        '#f7fcb9',
        '#d9f0a3',
        '#addd8e',
        '#78c679',
        '#41ab5d',
        '#238443',
        '#006837',
        '#004529',
        '#003529'
      ]
    }
  },
  {
    id: 'intermodal-points',
    title: 'Intermodal points',
    visible: false,
    switchable: true,
    legend: {
      collapsed: false,
      type: LEGEND_TYPES.ICON,
      icons: [
        `data:image/svg+xml,<svg width="128" height="129" viewBox="0 0 128 129" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.5" cx="64.0003" cy="64.2" r="53.3333" fill="white"/>
          <circle cx="63.9997" cy="64.1999" r="42.6667" fill="#0081F4"/>
          <mask id="mask0_1694_41838" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="32" y="32" width="64" height="65">
            <rect x="32" y="32.2" width="64" height="64" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_1694_41838)">
            <path d="M54.3955 89.8011V86.6011L59.9955 82.4011V67.6011L38.3955 73.8011V69.0011L59.9955 56.6677V42.6011C59.9955 41.49 60.3844 40.5455 61.1622 39.7677C61.94 38.99 62.8844 38.6011 63.9955 38.6011C65.1066 38.6011 66.0511 38.99 66.8288 39.7677C67.6066 40.5455 67.9955 41.49 67.9955 42.6011V56.6677L89.5955 69.0011V73.8011L67.9955 67.6011V82.4011L73.5955 86.6011V89.8011L63.9955 86.6011L54.3955 89.8011Z" fill="white"/>
          </g>
        </svg>`,
        `data:image/svg+xml,<svg width="128" height="129" viewBox="0 0 128 129" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.5" cx="64.0003" cy="64.2" r="53.3333" fill="white"/>
          <circle cx="63.9997" cy="64.1999" r="42.6667" fill="#0081F4"/>
          <mask id="mask0_1700_40659" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="32" y="32" width="64" height="65">
            <rect x="32" y="32.2" width="64" height="64" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_1700_40659)">
            <path d="M43.1982 86.5995C40.976 86.5995 39.0871 85.8217 37.5316 84.2662C35.976 82.7106 35.1982 80.8217 35.1982 78.5995C35.1982 77.3106 35.476 76.1106 36.0316 74.9995C36.5871 73.8884 37.376 72.9551 38.3982 72.1995V60.9995H44.7982V48.1995H63.9982L75.7316 73.5995C76.0871 74.2217 76.3538 74.8874 76.5316 75.5964C76.7094 76.3055 76.7982 77.0398 76.7982 77.7995C76.7982 80.23 75.9392 82.3043 74.2211 84.0224C72.503 85.7405 70.4287 86.5995 67.9982 86.5995C66.3251 86.5995 64.7846 86.1662 63.3767 85.2995C61.9688 84.4328 60.8775 83.2662 60.1027 81.7995H50.5316C49.9094 83.2662 48.9369 84.4328 47.6142 85.2995C46.2916 86.1662 44.8196 86.5995 43.1982 86.5995ZM79.9982 83.3995V44.9995H84.7982V78.5995H92.7982V83.3995H79.9982ZM43.1982 81.7995C44.1049 81.7995 44.8649 81.4929 45.4782 80.8795C46.0916 80.2662 46.3982 79.5062 46.3982 78.5995C46.3982 77.6928 46.0916 76.9328 45.4782 76.3195C44.8649 75.7062 44.1049 75.3995 43.1982 75.3995C42.2916 75.3995 41.5316 75.7062 40.9182 76.3195C40.3049 76.9328 39.9982 77.6928 39.9982 78.5995C39.9982 79.5062 40.3049 80.2662 40.9182 80.8795C41.5316 81.4929 42.2916 81.7995 43.1982 81.7995ZM67.9982 81.7995C69.1094 81.7995 70.0538 81.4106 70.8316 80.6328C71.6094 79.8551 71.9982 78.9106 71.9982 77.7995C71.9982 76.6884 71.6094 75.744 70.8316 74.9662C70.0538 74.1884 69.1094 73.7995 67.9982 73.7995C66.8871 73.7995 65.9427 74.1884 65.1649 74.9662C64.3871 75.744 63.9982 76.6884 63.9982 77.7995C63.9982 78.9106 64.3871 79.8551 65.1649 80.6328C65.9427 81.4106 66.8871 81.7995 67.9982 81.7995ZM56.3316 68.9995H68.3316L60.9316 52.9995H49.5982V62.5328L56.3316 68.9995Z" fill="white"/>
          </g>
        </svg>`,
        `data:image/svg+xml,<svg width="128" height="129" viewBox="0 0 128 129" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.5" cx="64.0003" cy="64.2" r="53.3333" fill="white"/>
          <circle cx="63.9997" cy="64.1999" r="42.6667" fill="#0081F4"/>
          <mask id="mask0_1694_41840" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="32" y="32" width="64" height="65">
            <rect x="32" y="32.2" width="64" height="64" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_1694_41840)">
            <path d="M43.1987 83.2671L38.5987 66.3337C38.2431 65.0893 38.3542 63.9115 38.932 62.8004C39.5098 61.6893 40.3987 60.9115 41.5987 60.4671L44.7987 59.3337V46.6004C44.7987 45.2671 45.2653 44.1337 46.1987 43.2004C47.132 42.2671 48.2653 41.8004 49.5987 41.8004H57.5987V35.4004H70.3987V41.8004H78.3987C79.732 41.8004 80.8653 42.2671 81.7987 43.2004C82.732 44.1337 83.1987 45.2671 83.1987 46.6004V59.3337L86.3987 60.4671C87.5542 60.8226 88.432 61.5671 89.032 62.7004C89.632 63.8337 89.7542 65.0448 89.3987 66.3337L84.7987 83.3337C83.4653 83.2448 82.0987 82.9004 80.6987 82.3004C79.2987 81.7004 77.4653 80.6671 75.1987 79.2004C73.332 80.6226 71.4653 81.6782 69.5987 82.3671C67.732 83.0559 65.8653 83.4004 63.9987 83.4004C62.132 83.4004 60.2653 83.0559 58.3987 82.3671C56.532 81.6782 54.6653 80.6226 52.7987 79.2004C50.6209 80.6226 48.8098 81.6337 47.3653 82.2337C45.9209 82.8337 44.532 83.1782 43.1987 83.2671ZM38.3987 93.0004V88.2004H41.5987C43.732 88.2004 45.7431 87.9226 47.632 87.3671C49.5209 86.8115 51.2431 86.0004 52.7987 84.9337C54.3098 86.0004 56.0098 86.8115 57.8987 87.3671C59.7876 87.9226 61.8209 88.2004 63.9987 88.2004C66.132 88.2004 68.1431 87.9226 70.032 87.3671C71.9209 86.8115 73.6431 86.0004 75.1987 84.9337C76.7542 86.0004 78.4765 86.8115 80.3653 87.3671C82.2542 87.9226 84.2653 88.2004 86.3987 88.2004H89.5987V93.0004H86.3987C84.2653 93.0004 82.2542 92.7893 80.3653 92.3671C78.4765 91.9448 76.7542 91.2893 75.1987 90.4004C73.6431 91.2893 71.9209 91.9448 70.032 92.3671C68.1431 92.7893 66.132 93.0004 63.9987 93.0004C61.8209 93.0004 59.7987 92.7893 57.932 92.3671C56.0653 91.9448 54.3542 91.2893 52.7987 90.4004C51.2431 91.2893 49.5209 91.9448 47.632 92.3671C45.7431 92.7893 43.732 93.0004 41.5987 93.0004H38.3987ZM49.5987 57.5337L63.9987 52.3337L78.3987 57.6004V46.6004H49.5987V57.5337Z" fill="white"/>
          </g>
        </svg>`,
        `data:image/svg+xml,<svg width="128" height="129" viewBox="0 0 128 129" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.5" cx="64.0003" cy="64.2" r="53.3333" fill="white"/>
          <circle cx="63.9997" cy="64.1999" r="42.6667" fill="#0081F4"/>
          <mask id="mask0_1694_41839" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="32" y="32" width="64" height="65">
            <rect x="32" y="32.2" width="64" height="64" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_1694_41839)">
            <path d="M49.6018 89.7988V88.1988L52.9351 84.8655C50.5795 84.4655 48.6351 83.3766 47.1018 81.5988C45.5684 79.8211 44.8018 77.7544 44.8018 75.3988V51.3988C44.8018 48.1544 46.2906 45.7433 49.2684 44.1655C52.2462 42.5877 57.1573 41.7988 64.0018 41.7988C70.8462 41.7988 75.7573 42.5877 78.7351 44.1655C81.7129 45.7433 83.2018 48.1544 83.2018 51.3988V75.3988C83.2018 77.7544 82.4351 79.8211 80.9018 81.5988C79.3684 83.3766 77.424 84.4655 75.0684 84.8655L78.4018 88.1988V89.7988H49.6018ZM49.6018 62.5988H61.6018V54.5988H49.6018V62.5988ZM66.4018 62.5988H78.4018V54.5988H66.4018V62.5988ZM56.0018 76.9988C56.8906 76.9988 57.6462 76.6877 58.2684 76.0655C58.8906 75.4433 59.2018 74.6877 59.2018 73.7988C59.2018 72.9099 58.8906 72.1544 58.2684 71.5322C57.6462 70.9099 56.8906 70.5988 56.0018 70.5988C55.1129 70.5988 54.3573 70.9099 53.7351 71.5322C53.1129 72.1544 52.8018 72.9099 52.8018 73.7988C52.8018 74.6877 53.1129 75.4433 53.7351 76.0655C54.3573 76.6877 55.1129 76.9988 56.0018 76.9988ZM72.0018 76.9988C72.8906 76.9988 73.6462 76.6877 74.2684 76.0655C74.8906 75.4433 75.2018 74.6877 75.2018 73.7988C75.2018 72.9099 74.8906 72.1544 74.2684 71.5322C73.6462 70.9099 72.8906 70.5988 72.0018 70.5988C71.1129 70.5988 70.3573 70.9099 69.7351 71.5322C69.1129 72.1544 68.8018 72.9099 68.8018 73.7988C68.8018 74.6877 69.1129 75.4433 69.7351 76.0655C70.3573 76.6877 71.1129 76.9988 72.0018 76.9988Z" fill="white"/>
          </g>
        </svg>`,
        `data:image/svg+xml,<svg width="128" height="129" viewBox="0 0 128 129" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.5" cx="64.0003" cy="64.2" r="53.3333" fill="white"/>
          <circle cx="63.9997" cy="64.1999" r="42.6667" fill="#A5AA99"/>
          <circle cx="64.0003" cy="64.2" r="21.3333" fill="white"/>
        </svg>`
      ].map((txt) => txt.replace(/#/g, '%23')),
      labels: ['Airport', 'Dry Port', 'Port', 'Rail Hub', 'Others']
    }
  }
];
