import { BuilderService } from './builder.service';

describe('BuilderService', () => {
  let service: BuilderService;
  let findByPageKey: jest.Mock;

  const ctx = { tenantId: 't1', domain: 'acme.com', plan: 'pro' };
  const published = { page_key: 'homepage', sections_json: [{ id: 'pub' }], published_at: new Date() };
  const draftRecord = { page_key: 'homepage:draft', sections_json: [{ id: 'draft' }], published_at: null };
  const emptyLayout = { page_key: 'homepage', sections_json: [], published_at: null };

  beforeEach(() => {
    findByPageKey = jest.fn();
    service = new BuilderService({ findByPageKey } as any);
  });

  it('reads the published key when draft is false', async () => {
    findByPageKey.mockResolvedValue(published);

    const result = await service.getPageLayout(ctx as any, 'homepage', false, true);

    expect(findByPageKey).toHaveBeenCalledWith(ctx, 'homepage');
    expect(findByPageKey).not.toHaveBeenCalledWith(ctx, 'homepage:draft');
    expect(result).toBe(published);
  });

  it('never reads the draft key when canReadDraft is false (fail closed)', async () => {
    findByPageKey.mockResolvedValue(draftRecord);

    const result = await service.getPageLayout(ctx as any, 'homepage', true, false);

    expect(findByPageKey).toHaveBeenCalledTimes(1);
    expect(findByPageKey).toHaveBeenCalledWith(ctx, 'homepage');
    expect(result).toBe(draftRecord);
  });

  it('reads the draft key when draft is authorized', async () => {
    findByPageKey.mockResolvedValue(draftRecord);

    const result = await service.getPageLayout(ctx as any, 'homepage', true, true);

    expect(findByPageKey).toHaveBeenCalledWith(ctx, 'homepage:draft');
    expect(result).toBe(draftRecord);
  });

  it('falls back to the published version when the authorized draft is missing', async () => {
    findByPageKey.mockResolvedValueOnce(null).mockResolvedValueOnce(published);

    const result = await service.getPageLayout(ctx as any, 'homepage', true, true);

    expect(findByPageKey).toHaveBeenNthCalledWith(1, ctx, 'homepage:draft');
    expect(findByPageKey).toHaveBeenNthCalledWith(2, ctx, 'homepage');
    expect(result).toBe(published);
  });

  it('returns a default empty layout when neither draft nor published exists', async () => {
    findByPageKey.mockResolvedValue(null);

    const result = await service.getPageLayout(ctx as any, 'homepage', true, true);

    expect(result).toEqual(emptyLayout);
  });
});
