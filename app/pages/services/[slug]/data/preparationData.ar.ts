import { IconType } from 'react-icons';
import { FaClipboardList, FaUserClock, FaUtensils } from 'react-icons/fa';

export const preparationTipsAr: Record<string, { icon: IconType; title: string; description: string }[]> = {
  'General Medicine': [
    { icon: FaClipboardList, title: 'التاريخ الطبي', description: 'أحضر قائمة بالأدوية الحالية، الحساسية المعروفة، وأي تقارير طبية أو نتائج فحوصات حديثة.' },
    { icon: FaUserClock, title: 'الوصول مبكراً', description: 'يرجى الوصول قبل 10 دقائق من موعدك لإكمال التسجيل واستبيانات الصحة.' },
    { icon: FaUtensils, title: 'ملاحظات الأعراض', description: 'اكتب أعراضك، متى بدأت، وأي عوامل تجعلها أفضل أو أسوأ.' }
  ],
  'Pediatrics': [
    { icon: FaClipboardList, title: 'السجلات الصحية', description: 'أحضر سجلات التطعيم، مخططات النمو، وأي تقارير طبية سابقة.' },
    { icon: FaUserClock, title: 'الوصول مبكراً', description: 'الوصول قبل 10 دقائق لمساعدة طفلك على الاستقرار وإكمال النماذج الضرورية.' },
    { icon: FaUtensils, title: 'أغراض الراحة', description: 'أحضر لعبة طفلك المفضلة أو غرض الراحة لمساعدته على الشعور بالاسترخاء أثناء الزيارة.' }
  ],
  'Dermatology': [
    { icon: FaClipboardList, title: 'تاريخ البشرة', description: 'أحضر قائمة بمنتجات العناية بالبشرة، الأدوية، وأي علاجات جلدية سابقة أو حساسية.' },
    { icon: FaUserClock, title: 'الوصول مبكراً', description: 'يرجى الوصول قبل 10 دقائق لإكمال الأوراق الضرورية قبل استشارتك.' },
    { icon: FaUtensils, title: 'بشرة نظيفة', description: 'احضر ببشرة نظيفة، خالية من المكياج أو المستحضرات الثقيلة للسماح بالفحص المناسب.' }
  ],
  'Dentistry': [
    { icon: FaClipboardList, title: 'التاريخ السني', description: 'أحضر قائمة بالأدوية الحالية وأي سجلات أسنان سابقة إذا كانت هذه زيارتك الأولى.' },
    { icon: FaUserClock, title: 'الوصول مبكراً', description: 'نوصي بالوصول قبل 10 دقائق على الأقل من موعدك المحدد لتسجيل الوصول.' },
    { icon: FaUtensils, title: 'تناول وجبة خفيفة', description: 'تناول وجبة خفيفة قبل زيارتك، حيث قد يُنصح بعدم الأكل لمدة 30 دقيقة بعد علاج الفلورايد.' }
  ],
  'Gynecology': [
    { icon: FaClipboardList, title: 'معلومات الدورة', description: 'لاحظ تاريخ آخر دورة شهرية وأحضر أي سجلات طبية أو حمل ذات صلة.' },
    { icon: FaUserClock, title: 'الوصول مبكراً', description: 'الوصول قبل 10 دقائق لإكمال نماذج الصحة قبل فحصك.' },
    { icon: FaUtensils, title: 'ملابس مريحة', description: 'ارتدِ ملابس مريحة وأحضر أي أسئلة أو مخاوف قد تكون لديك.' }
  ],
  'Orthopedics': [
    { icon: FaClipboardList, title: 'التصوير والتقارير', description: 'أحضر أي أشعة سينية، فحوصات الرنين المغناطيسي، أو تقارير عظام سابقة متعلقة بحالتك.' },
    { icon: FaUserClock, title: 'الوصول مبكراً', description: 'يرجى الوصول قبل 10 دقائق من موعدك لإكمال نماذج التقييم.' },
    { icon: FaUtensils, title: 'ملابس مريحة', description: 'ارتدِ ملابس فضفاضة ومريحة تسمح بالوصول السهل إلى المنطقة المصابة.' }
  ],
  'Cardiology': [
    { icon: FaClipboardList, title: 'السجلات الطبية', description: 'أحضر نتائج تخطيط القلب السابقة، تقارير فحوصات الدم، وقائمة كاملة بالأدوية والمكملات.' },
    { icon: FaUserClock, title: 'الوصول مبكراً', description: 'الوصول قبل 15 دقيقة لفحص العلامات الحيوية والتحضير قبل الاستشارة.' },
    { icon: FaUtensils, title: 'إرشادات الصيام', description: 'إذا كانت فحوصات الدم مطلوبة، قد تحتاج إلى الصيام لمدة 8-12 ساعة. سنبلغك مسبقاً.' }
  ],
  'ENT': [
    { icon: FaClipboardList, title: 'تفاصيل الأعراض', description: 'وثق أعراضك بما في ذلك المدة والشدة وأي محفزات لاحظتها.' },
    { icon: FaUserClock, title: 'الوصول مبكراً', description: 'الوصول قبل 10 دقائق من وقتك المحدد لتسجيل الوصول والتقييمات الأولية.' },
    { icon: FaUtensils, title: 'قائمة الأدوية', description: 'أحضر قائمة كاملة بجميع الأدوية، بما في ذلك الأدوية التي لا تستلزم وصفة طبية والمكملات.' }
  ]
};
