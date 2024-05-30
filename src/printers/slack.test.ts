import { formatSlackMessage } from './slack';
import { TotalCosts } from '../cost';

describe('formatSlackMessage', () => {
  it('should format the message correctly for summary', () => {
    const accountAlias = 'testAccount';
    const costs: TotalCosts = {
      totals: {
        lastMonth: 123.45,
        thisMonth: 678.90,
        last7Days: 45.67,
        yesterday: 12.34,
      },
      totalsByService: {
        lastMonth: { service1: 123.45 },
        thisMonth: { service1: 678.90 },
        last7Days: { service1: 45.67 },
        yesterday: { service1: 12.34 },
      },
    };

    const isSummary = true;

    const message = formatSlackMessage(accountAlias, costs, isSummary);

    const expectedMessage = `> *Account: testAccount*

> *Summary *
> Total Yesterday: \`$12.34\`
> Total This Month: \`$678.90\`
> Total Last Month: \`$123.45\`
`;

    expect(message).toBe(expectedMessage);
  });

  it('should format the message correctly with breakdown', () => {
    const accountAlias = 'testAccount';
    const costs: TotalCosts = {
      totals: {
        lastMonth: 123.45,
        thisMonth: 678.90,
        last7Days: 45.67,
        yesterday: 12.34,
      },
      totalsByService: {
        lastMonth: { service1: 123.45 },
        thisMonth: { service1: 678.90 },
        last7Days: { service1: 45.67 },
        yesterday: { service1: 12.34 },
      },
    };

    const isSummary = false;

    const message = formatSlackMessage(accountAlias, costs, isSummary);

    const expectedMessage = `> *Account: testAccount*

> *Summary *
> Total Yesterday: \`$12.34\`
> Total This Month: \`$678.90\`
> Total Last Month: \`$123.45\`

> *Breakdown by Service:*
service1: $12.34
`;

    expect(message).toContain(`> *Account: testAccount*`);
    expect(message).toContain(`> Total Yesterday: \`$12.34\``);
    expect(message).toContain(`> Total This Month: \`$678.90\``);
    expect(message).toContain(`> Total Last Month: \`$123.45\``);
    expect(message).toContain(`> *Breakdown by Service:*`);
    expect(message).toContain(`service1: $12.34`);
  });
});
