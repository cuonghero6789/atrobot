import { TAB_HEIGHT } from '@/app/(tabs)/_layout';
import { AdUnitIds, TAB_BAR_HEIGHT } from '@/core/constants/adConfig';
import { useAuthStore } from '@/core/stores';
import { fontFamily } from '@/core/styles';
import React, { useEffect, useState } from 'react';
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import {
    BannerAd,
    BannerAdSize,
    NativeAd,
    NativeAdView,
    NativeAsset,
    NativeAssetType
} from 'react-native-google-mobile-ads';

export const BANNER_HEIGHT = 50;

interface CustomAdmobProps {
    style?: StyleProp<ViewStyle>;
    onAdLoaded?: () => void;
    onAdFailedToLoad?: () => void;
}

const isOff = false;
// Global flag to disable native ads if any error occurs
let nativeAdDisabled = false;

const BannerAdmob: React.FC<CustomAdmobProps> = React.memo(({ style, onAdLoaded, onAdFailedToLoad }) => {
    if (isOff) return null;

    try {
        return (
            <View style={[{ position: 'absolute', left: 0, right: 0, bottom: TAB_HEIGHT }, style]}>
                <BannerAd
                    onAdLoaded={() => {
                        console.log('BannerAd loaded');
                        onAdLoaded?.();
                    }}
                    onAdFailedToLoad={() => {
                        console.log('BannerAd failed to load');
                        onAdFailedToLoad?.();
                    }}
                    unitId={AdUnitIds.BANNER || ''}
                    size={BannerAdSize.FULL_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>
        );
    } catch (error) {
        console.error('Critical error in BannerAdmob:', error);
        return null;
    }
});

const NativeAdmob: React.FC<{ screenName?: string }> = React.memo(({ screenName = 'NativeComponent' }) => {
    const [nativeAd, setNativeAd] = useState<NativeAd>();
    const [adError, setAdError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;
        // If native ads are globally disabled, don't try to create them
        if (nativeAdDisabled) {
            console.log('Native ads are globally disabled due to previous errors');
            return;
        }

        try {
            NativeAd.createForAdRequest(AdUnitIds.NATIVE || '')
                .then((ad) => {
                    if (isActive) {
                        setNativeAd(ad);
                        console.log('Native ad created successfully screen name ===> ', screenName);
                    }
                })
                .catch((error) => {
                    if (isActive) {
                        console.log('NativeAd creation failed:', error);
                        setAdError('Failed to create native ad');
                        // Disable native ads globally on error
                        nativeAdDisabled = true;
                    }
                });
        } catch (error) {
            if (isActive) {
                console.log('NativeAd creation error:', error);
                setAdError('Failed to create native ad');
                // Disable native ads globally on error
                nativeAdDisabled = true;
            }
        }

        return () => {
            isActive = false;
        };
    }, []);

    if (isOff) return null;

    if (!nativeAd || adError || nativeAdDisabled) {
        return null;
    }

    // Star rating rendering helper
    const renderStars = (rating?: number | null) => {
        if (!rating) return null;
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
                {Array.from({ length: fullStars }).map((_, i) => (
                    <Text key={i} style={{ color: '#FFD700', fontSize: 14 }}>★</Text>
                ))}
                {halfStar && <Text style={{ color: '#FFD700', fontSize: 14 }}>☆</Text>}
            </View>
        );
    };

    // isOff is already handled above

    // Safe wrapper for NativeAsset components with error handling
    const SafeNativeAsset = ({ assetType, children }: {
        assetType: NativeAssetType;
        children: React.ReactElement;
    }) => {
        try {
            // Check if native ads are globally disabled
            if (nativeAdDisabled) {
                console.log(`NativeAsset skipped: native ads disabled for ${assetType}`);
                return null;
            }

            // Check if ad and required data exist
            if (!nativeAd) {
                console.log(`NativeAsset skipped: no native ad available for ${assetType}`);
                return null;
            }

            // Additional checks for specific asset types
            if (assetType === NativeAssetType.ICON && (!nativeAd.icon || !nativeAd.icon.url)) {
                console.log('NativeAsset ICON skipped: no icon data');
                return null;
            }

            if (assetType === NativeAssetType.HEADLINE && !nativeAd.headline) {
                console.log('NativeAsset HEADLINE skipped: no headline data');
                return null;
            }

            if (assetType === NativeAssetType.BODY && !nativeAd.body && !nativeAd.advertiser) {
                console.log('NativeAsset BODY skipped: no body/advertiser data');
                return null;
            }

            if (assetType === NativeAssetType.CALL_TO_ACTION && !nativeAd.callToAction) {
                console.log('NativeAsset CALL_TO_ACTION skipped: no call to action data');
                return null;
            }

            return (
                <NativeAsset assetType={assetType}>
                    {children}
                </NativeAsset>
            );
        } catch (error) {
            console.error(`NativeAsset error for ${assetType}:`, error);
            // Disable native ads globally on any NativeAsset error
            nativeAdDisabled = true;
            return null;
        }
    };

    try {
        return (
            <NativeAdView nativeAd={nativeAd} style={styles.adContainer}>
                <View style={styles.infoRow}>
                    <View style={styles.adBadge}><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>Ad</Text></View>
                    {/* Icon */}
                    {nativeAd.icon && nativeAd.icon.url && (
                        <SafeNativeAsset assetType={NativeAssetType.ICON}>
                            <Image source={{ uri: nativeAd.icon.url }} style={styles.avatar} />
                        </SafeNativeAsset>
                    )}
                    <View style={styles.infoText}>
                        {/* Headline */}
                        <SafeNativeAsset assetType={NativeAssetType.HEADLINE}>
                            <Text style={styles.title}>{nativeAd.headline}</Text>
                        </SafeNativeAsset>
                        {/* Body/Advertiser */}
                        <SafeNativeAsset assetType={NativeAssetType.BODY}>
                            <Text style={styles.sub}>{nativeAd.body || nativeAd.advertiser}</Text>
                        </SafeNativeAsset>
                        {/* Star rating */}
                        {renderStars(nativeAd.starRating)}
                    </View>
                    {/* Call to action */}
                    <SafeNativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
                        <View style={styles.ctaBtn}>
                            <Text style={styles.ctaText}>{nativeAd.callToAction || 'Install'}</Text>
                        </View>
                    </SafeNativeAsset>
                </View>
            </NativeAdView>
        );
    } catch (error) {
        console.error('Critical error in NativeComponent:', error);
        // Disable native ads globally on any critical error
        nativeAdDisabled = true;
        return null;
    }
});

const styles = StyleSheet.create({
    adContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    mediaWrapper: {
        position: 'relative',
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#eee',
    },
    media: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    adBadge: {
        position: 'absolute',
        top: 4,
        left: 8,
        backgroundColor: '#1976D2',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        zIndex: 2,
    },
    adChoices: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 2,
        zIndex: 2,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#eee',
        marginRight: 12,
    },
    infoText: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
        fontFamily: fontFamily.medium
    },
    sub: {
        color: '#888',
        fontSize: 13,
        marginTop: 2,
        fontFamily: fontFamily.medium
    },
    ctaBtn: {
        backgroundColor: '#1976D2',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    ctaText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: fontFamily.medium
    },
});

export { BannerAdmob, NativeAdmob };
