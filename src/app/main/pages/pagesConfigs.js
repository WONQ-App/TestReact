import TestPageConfig from './test/TestPageConfig';
import Error404PageConfig from './errors/404/Error404PageConfig';
import Error500PageConfig from './errors/500/Error500PageConfig';
import FaqPageConfig from './faq/FaqPageConfig';
import CompactInvoicePageConfig from './invoices/compact/CompactInvoicePageConfig';
import ModernInvoicePageConfig from './invoices/modern/ModernInvoicePageConfig';
import KnowledgeBasePageConfig from './knowledge-base/KnowledgeBaseConfig';
import MaintenancePageConfig from './maintenance/MaintenancePageConfig';
import PricingStyle1PageConfig from './pricing/style-1/PricingStyle1PageConfig';
import PricingStyle2PageConfig from './pricing/style-2/PricingStyle2PageConfig';
import PricingStyle3PageConfig from './pricing/style-3/PricingStyle3PageConfig';
import ProfilePageConfig from './profile/ProfilePageConfig';
import ClassicSearchPageConfig from './search/classic/ClassicSearchPageConfig';
import ModernSearchPageConfig from './search/modern/ModernSearchPageConfig';

const pagesConfigs = [
	TestPageConfig,
	Error404PageConfig,
	Error500PageConfig,
	MaintenancePageConfig,
	ModernInvoicePageConfig,
	CompactInvoicePageConfig,
	PricingStyle1PageConfig,
	PricingStyle2PageConfig,
	PricingStyle3PageConfig,
	ProfilePageConfig,
	ClassicSearchPageConfig,
	ModernSearchPageConfig,
	FaqPageConfig,
	KnowledgeBasePageConfig
];

export default pagesConfigs;
