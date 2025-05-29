import { spacing, textStyle } from "@/core/styles";
import React from "react"
import HTMLView from 'react-native-htmlview';
import { colors } from "@/core/styles";

interface Props {
    desc: string;
}

const AtroHtml = ({ desc }: Props) => {
    return <HTMLView
        value={`<p>${desc}</p>`}
        stylesheet={{
            p: {
                ...textStyle.body,
                color: colors.white,
                marginTop: spacing.large,
            }
        }}
    />
}
export default AtroHtml;