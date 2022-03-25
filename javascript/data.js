const LANG_UI = new Map([
    ['lang',     ['en'                              , '한글']],
    ['drop',     ['Drag file here...'               , '여기 파일을 놓으세요...']],
    ['dropFail', ['your .ADOFAI file is not proper!', '파일을 읽는데 실패하였습니다.']],
    ['noSelect', ['Nothing Selected'                , '선택된 이벤트 없음']],
]);

const LANG_MAIN = new Map([
    ['isMove',                  ['YOU ARE NOT SUPPOSED TO SEE THIS', '개발자에게 문의 부탁드립니다']],
    ['start',					['Start',                      '시작']], /* Bar <input> Beat <input> */
    ['end',				        ['End',                        '끝']],
    ['y',						['Event Y',					   '이벤트 높이']],
    ['eventType',				['Event Type',				   '이벤트 타입']],
    ['duration',				['Duration',				   '기간']],
    ['decorationImage',			['Image',			           '이미지']],
    ['decText',					['Text',					   '텍스트']],
    ['tag',						['Tag',						   '태그']],
    ['font',					['Font',					   '글꼴']],
    ['filter',					['Filter',					   '필터']],
    ['speedType',				['Speed Type',				   '속도 유형']],
    ['beatsPerMinute',			['Beats Per Minute',		   'BPM']],
    ['bpmMultiplier',			['BPM Multiplier',			   'BPM 승수']],
    ['gameSound',				['Game Sound',				   '게임 사운드']],
    ['hitsound',				['Hitsound',				   '히트사운드']],
    ['hitsoundVolume',			['Sound Volume',			   '히트사운드 음량']],
    ['startTile',				['Start Tile',				   '시작 타일']],
    ['endTile',					['End Tile',				   '끝 타일']],
    ['position',				['Position',				   '위치']],
    ['positionOffset',			['Position Offset',			   '위치 오프셋']],
    ['enabled',					['Set to',					   '설정']],
    ['strength',				['Strength',				   '크기']],
    ['threshold',				['Threshold',				   '영역']],
    ['intensity',				['Intensity',				   '강도']],
    ['disableOthers',			['Disable Others',			    '다른 필터 끄기']],
    ['fadeOut',					['Fade Out',				   '차차 가라앉기']],
    ['relativeTo',				['Relative To',				   '기준 좌표']],
    ['pivotOffset',				['Pivot Offset',			   '중심점 오프셋']],
    ['rotation',				['Rotation',				   '회전']],
    ['rotationOffset',			['Rotation',				   '회전']],
    ['scale',					['Scale',					   '크기']],
    ['zoom',					['Zoom',					   '확대']],
    ['tile',					['Tiling',					   '바둑판 크기']],
    ['color',					['Color',					   '색상']],
    ['scroll',					['Scroll Speed',			   '스크롤 속도']],
    ['repetitions',				['Repetitions',				   '반복 횟수']],
    ['interval',				['Interval',				   '간격']],
    ['bgImage',					['Image',					   '이미지']],
    ['imageColor',				['Image Color',				   '이미지 색상']],
    ['opacity',					['Opacity',					   '불투명도']],
    ['depth',					['Depth',					   '깊이']],
    ['parallax',				['Parallax',				   '시차']],
    ['bgDisplayMode',			['Display Mode',			   '디스플레이 모드']],
    ['lockRot',					['Lock Rotation',			   '회전 잠금']],
    ['loopBG',					['Loop Background',		       '배경 반복']],
    ['unscaledSize',			['Unscaled Size',			   '원본 크기']],
    ['plane',					['Plane',					   '깊이']],
    ['startColor',				['Start Color',				   '시작 색상']],
    ['startOpacity',			['Start Opacity',			   '시작 불투명도']],
    ['endColor',				['End Color',				   '끝 색상']],
    ['endOpacity',				['End Opacity',				   '끝 불투명도']],
    ['trackColorType',			['Track Color Type',		   '길 색상 유형']],
    ['trackColor',				['Track Color',				   '길 색상']],
    ['secondaryTrackColor',		['Secondary Track Color',	   '길 두 번째 색상']],
    ['trackColorAnimDuration',	['Color Animation Interval',   '색상 애니메이션 간격']],
    ['trackColorPulse',			['Color Pulse',			       '색상 맥박 유형']],
    ['trackPulseLength',		['Color Pulse Length',		   '색상 맥박 길이']],
    ['trackStyle',				['Track Style',				   '길 모양']],
    ['trackTexture',			['Track Texture',			   '길 텍스처']],
    ['trackTextureScale',		['Track Texture Zoom',		   '길 텍스처 확대']],
    ['trackAnimation',			['Track Appear Animation',	   '길 출현 애니메이션']],
    ['beatsAhead',				['Beats Before for Animation', '길 출현 애니메이션 박자']],
    ['trackDisappearAnimation',	['Track Disappear Animation',  '길 퇴장 애니메이션']],
    ['beatsBehind',				['Beats After for Animation',  '길 퇴장 애니메이션 박자']],
    ['editorOnly',				['Editor Only',				   '에디터 전용']],
    ['floor',					['Relative to Floor',          '시작 타일']], /* Relative to Floor <input> */
    ['angleOffset',				['Angle Offset',			   '각도 오프셋']],
    ['ease',			    	['Ease',				       '가감속']],
    ['easeParts',				['Ease Parts',				   '부분 가감속']],
    ['perfectTag',				['"Perfect" Tag',			   '"정확" 태그']],
    ['hitTag',				    ['"E/LPerfect" Tag',		   '"빠름/느림" 태그']],
    ['barelyTag',				['"Early/Late" Tag',		   '"빠름!/느림!" 태그']],
    ['missTag',					['"Miss" Tag',				   '헛침 태그']],
    ['lossTag',					['"Loss" Tag',				   '게임 오버 태그']],
    ['eventTag',				['Event Tag',				   '이벤트 태그']],
    ['imageSmoothing',			['Image Smoothing',			   '부드러운 가장자리']],
    ['components',				['Components',				   '컴포넌트']],
    ['comment',					['Comment',					   '주석']],
    ['sortOrder',				['Sort Order',  			   '실행 순서']]
]);

const LANG_EVENTTYPE = new Map([
    ['SetSpeed',             ['Set Speed',              '속도 설정']],
    ['Twirl',                ['Twirl',                  '소용돌이']],
    ['Checkpoint',           ['Checkpoint',             '체크포인트']],
    ['SetHitsound',          ['Set Hitsound',           '히트사운드 설정']],
    ['PlaySound',            ['Play Sound',             '사운드 재생']],
    ['SetPlanetRotation',    ['Set Planet Orbit',       '행성 공전 설정']],
    ['ColorTrack',           ['Set Track Color',        '길 색상 설정']],
    ['AnimateTrack',         ['Set Track Animation',    '길 애니메이션 설정']],
    ['RecolorTrack',         ['Recolor Track',          '길 색상 다시 설정']],
    ['MoveTrack',            ['Move Track',             '길 이동']],
    ['PositionTrack',        ['Position Track',         '길 위치']],
    ['AddDecoration',        ['Add Decoration',         '장식 추가']],
    ['MoveDecorations',      ['Move Decorations',       '장식 이동']],
    ['AddText',              ['Add Text',               '텍스트 추가']],
    ['SetText',              ['Set Text',               '텍스트 설정']],
    ['CustomBackground',     ['Set Background',         '배경 설정']],
    ['Flash',                ['Flash',                  '플래시']],
    ['MoveCamera',           ['Move Camera',            '카메라 이동']],
    ['SetFilter',            ['Set Filter',             '필터 설정']],
    ['HallOfMirrors',        ['Hall of Mirrors',        '거울의 방']],
    ['ShakeScreen',          ['Shake Screen',           '화면 흔들기']],
    ['Bloom',                ['Bloom',                  '블룸']],
    ['ScreenTile',           ['Tile Screen',            '화면 바둑판식 배열']],
    ['ScreenScroll',         ['Scroll Screen',          '화면 스크롤']],
    ['RepeatEvents',         ['Repeat Events',          '이벤트 반복']],
    ['SetConditionalEvents', ['Set Conditional Events', '조건부 이벤트 설정']],
    ['EditorComment',        ['Editor Comment',         '코멘트']],
    ['Bookmark',             ['Bookmark',               '북마크']]
]);

const LANG_SPEEDTYPE = new Map([
    ['Bpm', ['BPM', 'BPM']],
    ['Multiplier', ['Multiplier', '승수']]
]);

const LANG_GAMESOUND = new Map([
    ['Hitsound', ['Hitsound', '히트사운드']],
    ['Midspin', ['Midspin',  '미드스핀']]
]);

const LANG_HITSOUND = new Map([
    ['Hat',            ['Hat',              '햇']],
    ['Kick',           ['Kick',             '킥']],
    ['Shaker',         ['Shaker',           '셰이커']],
    ['Sizzle',         ['Sizzle',           '시즐']],
    ['Chuck',          ['Chuck',            '척']],
    ['ShakerLoud',     ['Shaker (Loud)',    '셰이커 (고음량)']],
    ['None',           ['None',             '없음']],
    ['Hammer',         ['Hammer',           '해머']],
    ['KickChroma',     ['Kick Chroma',      '킥 크로마']],
    ['SnareAcoustic2', ['Snare Acoustic 2', '스네어 어쿠스틱 2']],
    ['Sidestick',      ['Sidestick',        '사이드스틱']],
    ['Stick',          ['Stick',            '스틱']],
    ['ReverbClack',    ['Reverb Clack',     '리버브 클랙']],
    ['Squareshot',     ['Squareshot',       '스퀘어샷']],
    ['PowerDown',      ['Slow Down',        '속도 감소']],
    ['PowerUp',        ['Speed Up',         '속도 증가']],
    ['KickHouse',      ['Kick House',       '킥 하우스']],
    ['KickRupture',    ['Kick Rupture',     '킥 럽처']],
    ['HatHouse',       ['Hat House',        '햇 하우스']],
    ['SnareHouse',     ['Snare House',      '스네어 하우스']],
    ['SnareVapor',     ['Snare Vapor',      '스네어 베이퍼']]
]);

const LANG_EASING = new Map([
    ['Linear',       ['Linear',         '리니어']],
    ['InSine',       ['In Sine',        '인 사인']],
    ['OutSine',      ['Out Sine',       '아웃 사인']],
    ['InOutSine',    ['In Out Sine',    '인 아웃 사인']],
    ['InQuad',       ['In Quad',        '인 쿼드']],
    ['OutQuad',      ['Out Quad',       '아웃 쿼드']],
    ['InOutQuad',    ['In Out Quad',    '인 아웃 쿼드']],
    ['InCubic',      ['In Cubic',       '인 큐빅']],
    ['OutCubic',     ['Out Cubic',      '아웃 큐빅']],
    ['InOutCubic',   ['In Out Cubic',   '인 아웃 큐빅']],
    ['InQuart',      ['In Quart',       '인 쿼트']],
    ['OutQuart',     ['Out Quart',      '아웃 쿼트']],
    ['InOutQuart',   ['In Out Quart',   '인 아웃 쿼트']],
    ['InQuint',      ['In Quint',       '인 퀸트']],
    ['OutQuint',     ['Out Quint',      '아웃 퀸트']],
    ['InOutQuint',   ['In Out Quint',   '인 아웃 퀸트']],
    ['InExpo',       ['In Expo',        '인 엑스포']],
    ['OutExpo',      ['Out Expo',       '아웃 엑스포']],
    ['InOutExpo',    ['In Out Expo',    '인 아웃 엑스포']],
    ['InCirc',       ['In Circ',        '인 써클']],
    ['OutCirc',      ['Out Circ',       '아웃 써클']],
    ['InOutCirc',    ['In Out Circ',    '인 아웃 써클']],
    ['InElastic',    ['In Elastic',     '인 엘라스틱']],
    ['OutElastic',   ['Out Elastic',    '아웃 엘라스틱']],
    ['InOutElastic', ['In Out Elastic', '인 아웃 엘라스틱']],
    ['InBack',       ['In Back',        '인 백']],
    ['OutBack',      ['Out Back',       '아웃 백']],
    ['InOutBack',    ['In Out Back',    '인 아웃 백']],
    ['InBounce',     ['In Bounce',      '인 바운스']],
    ['OutBounce',    ['Out Bounce',     '아웃 바운스']],
    ['InOutBounce',  ['In Out Bounce',  '인 아웃 바운스']],
    ['Flash',        ['Flash',          '플래시']],
    ['InFlash',      ['In Flash',       '인 플래시']],
    ['OutFlash',     ['Out Flash',      '아웃 플래시']],
    ['InOutFlash',   ['In Out Flash',   '인 아웃 플래시']]
])

const LANG_COLORTYPE = new Map([
    ['Single', ['Single', '단색']],
    ['Stripes', ['Stripes', '줄무늬']],
    ['Glow', ['Glow', '불빛']],
    ['Blink', ['Blink', '깜박이기']],
    ['Switch', ['Switch', '스위치']],
    ['Rainbow', ['Rainbow', '무지개']],
    ['Volume', ['Volume', '음량']]
]);

const LANG_COLORPULSE = new Map([
    ['None', ['None', '없음']],
    ['Forward', ['Forward', '앞으로']],
    ['Backward', ['Backward', '뒤로']]
]);

const LANG_TRACKTYPE = new Map([
    ['Standard', ['Standard', '일반']],
    ['Neon', ['Neon', '네온']],
    ['NeonLight', ['Neon Light', '네온 불빛']],
    ['Basic', ['Basic', '기본']],
    ['Gems', ['Gems', '보석']],
]);

const LANG_APPEARANIM = new Map([
    ['None', ['None', '없음']],
    ['Assemble', ['Assemble', '조립']],
    ['Assemble_Far', ['Assemble Far', '멀리서 조립']],
    ['Extend', ['Extend', '확장']],
    ['Grow', ['Grow', '커지기']],
    ['Grow_Spin', ['Grow + Spin', '회전하며 커지기']],
    ['Fade', ['Fade', '서서히']],
    ['Drop', ['Drop', '떨어지기']],
    ['Rise', ['Rise', '솟아나기']]
]);

const LANG_DISAPPEARANIM = new Map([
    ['None', ['None', '없음']],
    ['Scatter', ['Scatter', '해체']],
    ['Scatter_Far', ['Scatter Far', '멀리서 해체']],
    ['Retract', ['Retract', '딸려가기']],
    ['Shrink', ['Shrink', '수축']],
    ['Shrink_Spin', ['Shrink + Spin', '회전하며 수축']],
    ['Fade', ['Fade', '서서히']]
]);

const LANG_TILEBASIS = new Map([
    ['ThisTile', ['This Tile', '이 타일']],
    ['Start', ['First Tile', '첫 타일']],
    ['End', ['Last Tile', '마지막 타일']]
]);

const LANG_DECOBASIS = new Map([
    ['Tile', ['Tile', '타일']],
    ['Global', ['Global', '글로벌']],
    ['RedPlanet', ['Fire Planet', '불 행성']],
    ['BluePlanet', ['Ice Planet', '얼음 행성']]
]);

const LANG_CAMBASIS = new Map([
    ['Player', ['Player', '플레이어']],
    ['Tile', ['Tile', '타일']],
    ['Global', ['Global', '글로벌']],
    ['LastPosition', ['Last Position', '마지막 위치']]
]);

const LANG_ALLBASIS = new Map([
    ['Tile', ['Tile', '타일']],
    ['Global', ['Global', '글로벌']]
]);

const LANG_FILTER = new Map([
    ['Grayscale', ['Grayscale', '흑백']],
    ['Sepia', ['Sepia', '세피아']],
    ['Invert', ['Invert Colors', '색상 반전']],
    ['VHS', ['VHS', '비디오']],
    ['EightiesTV', ['80\'s TV', '80년대 TV']],
    ['FiftiesTV', ['50\'s TV', '50년대 TV']],
    ['Arcade', ['Arcade', '아케이드']],
    ['LED', ['LED', 'LED']],
    ['Rain', ['Rain', '비']],
    ['Blizzard', ['Blizzard', '눈폭풍']],
    ['PixelSnow', ['Pixel Snow', '픽셀 눈']],
    ['Compression', ['Compression', '압축']],
    ['Glitch', ['Glitch', '글리치']],
    ['Pixelate', ['Pixelate', '픽셀화']],
    ['Waves', ['Waves', '물결']],
    ['Static', ['Static', '잡음']],
    ['Grain', ['Film Grain', '필름 그레인']],
    ['MotionBlur', ['Motion Blur', '모션 블러']],
    ['Fisheye', ['Fisheye', '어안 렌즈']],
    ['Aberration', ['Aberration', '색수차']],
    ['Drawing', ['Drawing', '드로잉']],
    ['Neon', ['Neon', '네온']],
    ['Handheld', ['8-bit Handheld', '8비트 휴대기기']],
    ['NightVision', ['Night Vision', '야시경']],
    ['Funk', ['Funk', '평크']],
    ['Tunnel', ['Tunnel', '터널']],
    ['Weird3D', ['Weird 3D', '이상한 3D']]
]);

const LANG_FONT = new Map([
    ['Default', ['Default', '기본']],
    ['Arial', ['Arial', 'Arial']],
    ['ComicSansMS', ['Comic Sans MS', 'Comic Sans MS']],
    ['CourierNew', ['Courier New', 'Courier New']],
    ['Georgia', ['Georgia', 'Georgia']],
    ['Impact', ['Impact', 'Impact']],
    ['TimesNewRoman', ['Times New Roman', 'Times New Roman']],
]);

const LANG_DISPLAYMODE = new Map([
    ['FitToScreen', ['Fit To Screen', '화면에 맞게']],
    ['Unscaled', ['Unscaled', '크기 조절하지 않음']],
    ['Tiled', ['Tiled', '타일']]
]);

const LANG_PLANE = new Map([
    ['Foreground', ['Foreground', '전경']],
    ['Background', ['Background', '배경']]
]);

const LANG_PROCESS = new Map([
    ['isMove',                  ['skip']],
    ['start',					['barbeat']], /* Bar <input> Beat <input> */
    ['end',				        ['barbeat']],
    ['y',						['int', ['', ''], 0]],
    ['eventType',				['select', LANG_EVENTTYPE]],
    ['duration',				['float', ['beats', '박자'], 0]],
    ['decorationImage',			['string']],
    ['decText',					['string']],
    ['tag',						['tag']],
    ['font',					['select', LANG_FONT]],
    ['filter',					['select', LANG_FILTER]],
    ['speedType',				['select', LANG_SPEEDTYPE]],
    ['beatsPerMinute',			['float', ['BPM', 'BPM'], 0]],
    ['bpmMultiplier',			['float', ['x', 'x'], 0]],
    ['gameSound',				['select', LANG_GAMESOUND]],
    ['hitsound',				['select', LANG_HITSOUND]],
    ['hitsoundVolume',			['float', ['%', '%']]],
    ['startTile',				['tile']],
    ['endTile',					['tile']],
    ['position',				['coord', ['tiles', '타일']]],
    ['positionOffset',			['coord', ['tiles', '타일']]],
    ['enabled',					['checkbox']],
    ['strength',				['float', ['%', '%']]],
    ['threshold',				['float', ['%', '%']]],
    ['intensity',				['float', ['%', '%']]],
    ['disableOthers',			['checkbox']],
    ['fadeOut',					['checkbox']],
    ['relativeTo',				['select', null]],
    ['pivotOffset',				['coord', ['tiles', '타일']]],
    ['rotation',				['float', ['˚', '˚']]],
    ['rotationOffset',			['float', ['˚', '˚']]],
    ['scale',					['coord', ['%', '%']]],
    ['zoom',					['float', ['%', '%']]],
    ['tile',					['coord', ['%', '%']]],
    ['color',					['color']],
    ['scroll',					['coord', ['%', '%'], 0, 100]],
    ['repetitions',				['int', ['', ''], 0]],
    ['interval',				['float', ['beats', '박자'], 0]],
    ['bgImage',					['string']],
    ['imageColor',				['color']],
    ['opacity',					['float', ['%', '%']]],
    ['depth',					['int', ['', ''], -100, 100]],
    ['parallax',				['int', ['', ''], -100, 100]],
    ['bgDisplayMode',			['select', LANG_DISPLAYMODE]],
    ['lockRot',					['checkbox']],
    ['loopBG',					['checkbox']],
    ['unscaledSize',			['float', ['%', '%']]],
    ['plane',					['select', LANG_PLANE]],
    ['startColor',				['color']],
    ['startOpacity',			['float', ['%', '%']]],
    ['endColor',				['color']],
    ['endOpacity',				['float', ['%', '%']]],
    ['trackColorType',			['select', LANG_COLORTYPE]],
    ['trackColor',				['color']],
    ['secondaryTrackColor',		['color']],
    ['trackColorAnimDuration',	['float', ['seconds', '초'], 0]],
    ['trackColorPulse',			['select', LANG_COLORPULSE]],
    ['trackPulseLength',		['int', ['tiles', '타일'], 2]],
    ['trackStyle',				['select', LANG_TRACKTYPE]],
    ['trackTexture',			['string']],
    ['trackTextureScale',		['float', ['', ''], 0.001]],
    ['trackAnimation',			['select', LANG_APPEARANIM]],
    ['beatsAhead',				['float', ['beats', '박자'], 0]],
    ['trackDisappearAnimation',	['select', LANG_DISAPPEARANIM]],
    ['beatsBehind',				['float', ['beats', '박자'], 0]],
    ['editorOnly',				['checkbox']],
    ['floor',					['floor', ['', ''], 0]], /* Relative to Floor <input> */
    ['angleOffset',				['float', ['˚', '˚']]],
    ['ease',			    	['select', LANG_EASING]],
    ['easeParts',				['int', ['', ''], 1]],
    ['perfectTag',				['tag']],
    ['hitTag',				    ['tag']],
    ['barelyTag',				['tag']],
    ['missTag',					['tag']],
    ['lossTag',					['tag']],
    ['eventTag',				['tag']],
    ['imageSmoothing',			['checkbox']],
    ['components',				['skip']],
    ['comment',					['string']],
    ['sortOrder',				['int', ['', '']]]
]);